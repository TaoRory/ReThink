-- ============================================================
-- ReThink Voices — Production schema (Supabase / Postgres)
-- Run in the Supabase SQL editor. Covers MVP tables + Phase 2
-- (tags, sponsors, speaker_pipeline) with RLS enabled everywhere.
-- ============================================================

-- ---------- enums ----------
create type user_role as enum ('reader', 'writer', 'editor', 'admin');
create type topic_status as enum ('upcoming', 'open', 'closed', 'archived');
create type submission_status as enum
  ('draft', 'submitted', 'in_review', 'curated', 'published', 'archived');
create type length_type as enum ('short', 'long');
create type pipeline_stage as enum
  ('written', 'invited_salon', 'spoke_salon', 'tedx_shortlist', 'tedx_speaker');

-- ---------- profiles ----------
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text default '',
  role user_role not null default 'writer',
  is_alumni boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- sponsors (Phase 2) ----------
create table sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  url text,
  tier text,
  created_at timestamptz not null default now()
);

-- ---------- topics ----------
create table topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  prompt text not null,
  description text default '',
  month date not null,
  status topic_status not null default 'upcoming',
  cover_image_url text,
  sponsor_id uuid references sponsors (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- submissions ----------
create table submissions (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  topic_id uuid not null references topics (id) on delete cascade,
  author_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  body text not null default '',
  excerpt text default '',
  length_type length_type not null default 'short',
  status submission_status not null default 'draft',
  is_spotlight boolean not null default false,
  reading_time_min int not null default 1,
  cover_image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index submissions_topic_idx on submissions (topic_id, status);
create index submissions_author_idx on submissions (author_id, status);

-- ---------- reactions ----------
create table reactions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  type text not null default 'clap',
  created_at timestamptz not null default now(),
  unique (submission_id, user_id, type)
);

-- ---------- tags (Phase 2) ----------
create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

create table submission_tags (
  submission_id uuid references submissions (id) on delete cascade,
  tag_id uuid references tags (id) on delete cascade,
  primary key (submission_id, tag_id)
);

-- ---------- speaker pipeline (Phase 2 — core differentiator) ----------
create table speaker_pipeline (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles (id) on delete cascade,
  submission_id uuid references submissions (id) on delete set null,
  stage pipeline_stage not null default 'written',
  notes text default '',           -- internal only, hidden by the public view
  updated_at timestamptz not null default now()
);

-- Public, safe projection of the pipeline (no internal notes)
create view speaker_journey as
  select id, author_id, submission_id, stage, updated_at
  from speaker_pipeline;

-- ---------- helpers ----------
create or replace function current_role_at_least(min_role user_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select case min_role
        when 'reader' then true
        when 'writer' then role in ('writer', 'editor', 'admin')
        when 'editor' then role in ('editor', 'admin')
        when 'admin'  then role = 'admin'
      end
     from profiles where id = auth.uid()),
    false
  );
$$;

-- auto profile on signup
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'user-' || left(new.id::text, 8)),
    coalesce(new.raw_user_meta_data ->> 'display_name', 'ReThinker')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- keep updated_at fresh
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger submissions_touch before update on submissions
  for each row execute function touch_updated_at();
create trigger pipeline_touch before update on speaker_pipeline
  for each row execute function touch_updated_at();

-- ============================================================
-- RLS
-- ============================================================
alter table profiles enable row level security;
alter table sponsors enable row level security;
alter table topics enable row level security;
alter table submissions enable row level security;
alter table reactions enable row level security;
alter table tags enable row level security;
alter table submission_tags enable row level security;
alter table speaker_pipeline enable row level security;

-- profiles: public read; user edits own (but not own role); admin edits role
create policy "profiles are public" on profiles
  for select using (true);
create policy "users update own profile" on profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and role = (select p.role from profiles p where p.id = auth.uid()));
create policy "admin manages profiles" on profiles
  for update using (current_role_at_least('admin'));

-- topics & sponsors: public read; editors write
create policy "topics are public" on topics for select using (true);
create policy "editors manage topics" on topics
  for all using (current_role_at_least('editor'));

create policy "sponsors are public" on sponsors for select using (true);
create policy "editors manage sponsors" on sponsors
  for all using (current_role_at_least('editor'));

-- submissions:
--   published → everyone; otherwise author or editor+
create policy "published pieces are public" on submissions
  for select using (
    status = 'published'
    or author_id = auth.uid()
    or current_role_at_least('editor')
  );

--   writers insert their own non-published pieces
create policy "writers create own pieces" on submissions
  for insert with check (
    author_id = auth.uid()
    and current_role_at_least('writer')
    and status in ('draft', 'submitted')
  );

--   writers edit their own pieces while not published;
--   they cannot set published/spotlight themselves
create policy "writers edit own unpublished" on submissions
  for update using (
    author_id = auth.uid()
    and status <> 'published'
  )
  with check (
    author_id = auth.uid()
    and status in ('draft', 'submitted')
    and is_spotlight = false
  );

--   editors do everything
create policy "editors manage submissions" on submissions
  for all using (current_role_at_least('editor'));

-- reactions: visible to all; user manages own
create policy "reactions are public" on reactions for select using (true);
create policy "users add own reactions" on reactions
  for insert with check (user_id = auth.uid());
create policy "users remove own reactions" on reactions
  for delete using (user_id = auth.uid());

-- tags: public read, editors write
create policy "tags are public" on tags for select using (true);
create policy "editors manage tags" on tags
  for all using (current_role_at_least('editor'));
create policy "submission tags are public" on submission_tags for select using (true);
create policy "editors manage submission tags" on submission_tags
  for all using (current_role_at_least('editor'));

-- speaker_pipeline: only editors touch the table; the public reads
-- through the speaker_journey view (which hides notes)
create policy "editors manage pipeline" on speaker_pipeline
  for all using (current_role_at_least('editor'));
