"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ESCAPE_PRICING, GAME_CFG, money, promoMatches, slotsFor, type GameId, type RegType } from "@/lib/halloween-games";
import { Branch } from "./Scene";

/**
 * The two Halloween games, hung from the branch. Pressing a card opens a
 * registration dialog (native <dialog>: focus trap, Esc, backdrop for free).
 * The escape room's form also has the session picker.
 *
 * Submissions are POSTed as JSON to NEXT_PUBLIC_HLW_FORM_URL — the Google
 * Apps Script in docs/halloween-sheet.gs, which writes them into a Sheet and
 * refuses a session that has no room left (see docs/halloween-registration.md).
 * A GET to the same URL returns the seats already taken per session. Until the
 * URL is set the form says registration is not open yet instead of pretending to send.
 */

type StoryCopy = {
  kicker: string;
  heading: string;
  blocks: readonly { heading?: string; paras: readonly string[] }[];
  outro: string;
};

type GameCopy = {
  tag: string;
  name: string;
  desc: string;
  facts: readonly string[];
  cta: string;
  storyCta: string;
  formTitle: string;
  /** the ways to register for this game (ids from GAME_CFG[game].types) */
  types: Record<RegType, { name: string; note: string }>;
  slotNote: string;
  story: StoryCopy;
};

export type GamesCopy = {
  hunt: GameCopy;
  escape: GameCopy;
  form: {
    name: string;
    email: string;
    studentId: string;
    phone: string;
    typeLegend: string;
    seatsLeft: string;
    seatsLoading: string;
    full: string;
    noRoomForType: string;
    teamName: string;
    members: string;
    membersHint: string;
    membersCount: string;
    membersEmail: string;
    payTitle: string;
    payLead: string;
    payQrMissing: string;
    groupSizeLabel: string;
    priceLabel: string;
    perPerson: string;
    peopleCount: string;
    totalLabel: string;
    promoLabel: string;
    promoApply: string;
    promoOk: string;
    promoBad: string;
    proofLabel: string;
    proofChoose: string;
    proofChange: string;
    proofRequired: string;
    proofBad: string;
    proofReading: string;
    proofRejected: string;
    contactNote: string;
    slotFullNow: string;
    slotLegend: string;
    slotRequired: string;
    required: string;
    submit: string;
    sending: string;
    close: string;
    registerNow: string;
    successTitle: string;
    successBody: string;
    successSlot: string;
    error: string;
    notOpen: string;
  };
};

/** ONE payment QR for every price: public/halloween/qr.* (the amount is typed in by whoever pays); first file that loads wins */
const QR_FILES = ["qr.png", "qr.jpg", "qr.jpeg", "qr.webp", "qr67.png", "qr67.jpg", "qr67.jpeg", "qr67.webp"] as const;

const FORM_URL = process.env.NEXT_PUBLIC_HLW_FORM_URL ?? "";
const MASK: Record<GameId, { src: string; w: number; h: number }> = {
  hunt: { src: "mask-meo.webp", w: 150, h: 189 },
  escape: { src: "mask-cu.webp", w: 104, h: 163 },
};

export function HalloweenGames({
  kicker,
  heading,
  lead,
  copy,
}: {
  kicker: string;
  heading: string;
  lead: string;
  copy: GamesCopy;
}) {
  const [panel, setPanel] = useState<{ game: GameId; mode: "register" | "story" } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const seats = useTaken();
  const { load: loadSeats } = seats;

  // fetch the counts as soon as the page is up, so the picker already has them when it opens
  useEffect(() => {
    void loadSeats();
  }, [loadSeats]);
  // and refresh them each time the escape-room form opens
  useEffect(() => {
    if (panel?.game === "escape" && panel.mode === "register") void loadSeats();
  }, [panel, loadSeats]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (panel && !d.open) d.showModal();
    if (!panel && d.open) d.close();
  }, [panel]);

  return (
    <section id="games" className="relative overflow-hidden px-5 pb-28 pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hlw-kicker">
              <span className="hlw-rule mr-3" />
              {kicker}
            </p>
            <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{heading}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--hlw-bone)]/80">{lead}</p>
        </div>

        {/* the branch the two games hang from */}
        <div className="relative mt-16">
          <Branch className="absolute -left-[6%] top-0 hidden h-6 w-[112%] -rotate-[1.2deg] md:block" />
          <div className="grid gap-x-10 gap-y-14 pt-4 md:grid-cols-2">
            {(["hunt", "escape"] as const).map((id, i) => {
              const g = copy[id];
              const m = MASK[id];
              return (
                <div key={id} className={`hlw-sway ${i ? "hlw-sway-b" : ""}`}>
                  <span className="mx-auto hidden h-10 w-px bg-[rgba(222,217,196,0.45)] md:block" />
                  <article className="hlw-card hlw-game flex flex-col px-6 pb-7 pt-8 text-center">
                    <div className="flex h-[170px] items-center justify-center">
                      <Image
                        src={`/halloween/${m.src}`}
                        alt=""
                        width={m.w}
                        height={m.h}
                        unoptimized
                        className="hlw-pixel hlw-mask h-auto max-h-[160px] w-auto"
                      />
                    </div>
                    <span className="hlw-plaque mx-auto mt-5 inline-block">{g.tag}</span>
                    <h3 className="hlw-title mt-4 text-lg">{g.name}</h3>
                    <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-[color:var(--hlw-bone)]/75">
                      {g.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {g.facts.map((f) => (
                        <span key={f} className="hlw-fact">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap justify-center gap-3 pt-6">
                      <button type="button" className="hlw-btn" aria-haspopup="dialog" onClick={() => setPanel({ game: id, mode: "register" })}>
                        {g.cta}
                      </button>
                      <button type="button" className="hlw-btn hlw-btn-ghost" aria-haspopup="dialog" onClick={() => setPanel({ game: id, mode: "story" })}>
                        {g.storyCta}
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="hlw hlw-modal"
        onClose={() => setPanel(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setPanel(null);
        }}
      >
        {panel?.mode === "register" && (
          <RegisterForm
            key={panel.game}
            game={panel.game}
            copy={copy}
            onClose={() => setPanel(null)}
            taken={seats.takenBy?.[panel.game] ?? null}
            loading={seats.loading}
            reload={seats.load}
          />
        )}
        {panel?.mode === "story" && (
          <StoryPanel
            key={panel.game}
            game={copy[panel.game]}
            closeLabel={copy.form.close}
            registerLabel={copy.form.registerNow}
            onClose={() => setPanel(null)}
            onRegister={() => setPanel({ game: panel.game, mode: "register" })}
          />
        )}
      </dialog>
    </section>
  );
}

function StoryPanel({
  game,
  closeLabel,
  registerLabel,
  onClose,
  onRegister,
}: {
  game: GameCopy;
  closeLabel: string;
  registerLabel: string;
  onClose: () => void;
  onRegister: () => void;
}) {
  const st = game.story;
  return (
    <div className="hlw-modal-body">
      <button type="button" className="hlw-modal-x" onClick={onClose} aria-label={closeLabel}>
        ×
      </button>
      <p className="hlw-kicker">{st.kicker}</p>
      <h3 className="hlw-script mt-3 text-3xl">{st.heading}</h3>
      <div className="mt-5 grid gap-5">
        {st.blocks.map((b, i) => (
          <div key={i}>
            {b.heading && <p className="hlw-kicker mb-2">{b.heading}</p>}
            {b.paras.map((p) => (
              <p key={p} className="mt-3 text-[14px] leading-relaxed text-[color:var(--hlw-bone)]/85 first:mt-0">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
      {st.outro && <p className="hlw-title mt-6 text-[15px] leading-snug">{st.outro}</p>}
      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" className="hlw-btn" onClick={onRegister}>
          {registerLabel}
        </button>
        <button type="button" className="hlw-btn hlw-btn-ghost" onClick={onClose}>
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

type Status = "idle" | "sending" | "done" | "error";
type Taken = Record<string, number>;
type TakenBy = Partial<Record<GameId, Taken>>;

/** seats already booked per session, read from the sheet's script (null = not known yet) */
function useTaken() {
  const [takenBy, setTakenBy] = useState<TakenBy | null>(null);
  const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    if (!FORM_URL) return;
    setLoading(true);
    try {
      const res = await fetch(`${FORM_URL}${FORM_URL.includes("?") ? "&" : "?"}action=availability`);
      const json = await res.json();
      // older script versions only know the escape room: { taken }
      if (json?.ok) setTakenBy((json.takenBy ?? (json.taken ? { escape: json.taken } : null)) as TakenBy | null);
    } catch {
      /* no counts — the picker still works, the sheet script enforces the limit */
    } finally {
      setLoading(false);
    }
  }, []);
  return { takenBy, loading, load };
}

/** shrink a photo to a small JPEG before it is sent: { dataUrl for the preview, base64 for the Sheet } */
async function shrinkPhoto(file: File): Promise<{ preview: string; base64: string; mime: string } | null> {
  if (!file.type.startsWith("image/")) return null;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1100 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#fff"; // transparent PNGs would turn black as JPEG
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(bmp, 0, 0, c.width, c.height);
    let q = 0.8;
    let url = c.toDataURL("image/jpeg", q);
    while (url.length > 700_000 && q > 0.4) {
      q -= 0.1;
      url = c.toDataURL("image/jpeg", q);
    }
    return { preview: url, base64: url.split(",")[1] ?? "", mime: "image/jpeg" };
  } catch {
    return null;
  }
}

function RegisterForm({
  game,
  copy,
  onClose,
  taken,
  loading,
  reload,
}: {
  game: GameId;
  copy: GamesCopy;
  onClose: () => void;
  taken: Taken | null;
  loading: boolean;
  reload: () => Promise<void>;
}) {
  const g = copy[game];
  const f = copy.form;
  const uid = useId();
  const cfg = GAME_CFG[game];
  const slots = slotsFor(game);
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState<RegType>("solo");
  const [slot, setSlot] = useState("");
  const [members, setMembers] = useState("");
  const [proof, setProof] = useState<{ preview: string; base64: string; mime: string; name: string } | null>(null);
  const [reading, setReading] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoOn, setPromoOn] = useState(false);
  const [groupSize, setGroupSize] = useState(cfg.groupMin);
  const [qrTry, setQrTry] = useState(0); // which QR file we are on
  const [errors, setErrors] = useState<Record<string, string>>({});

  const size = type === "solo" ? 1 : groupSize;
  const pricing = cfg.pricing;
  const unit = pricing ? (promoOn ? pricing.promoPrice : pricing.price) : 0;
  const total = unit * size;
  const left = (id: string) => (taken ? Math.max(0, cfg.capacity - (taken[id] ?? 0)) : null);
  const fits = (id: string) => {
    const l = left(id);
    return l === null || l >= size;
  };
  // a slot picked earlier may stop fitting when the type changes
  const slotOk = slot && fits(slot);
  const memberLines = members
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean).length;

  function applyPromo() {
    if (promoMatches(promoInput)) {
      setPromoOn(true);
      setErrors((e) => {
        const { promo: _p, ...rest } = e;
        return rest;
      });
    } else {
      setPromoOn(false);
      setErrors((e) => ({ ...e, promo: f.promoBad }));
    }
  }

  async function onPick(file: File | undefined) {
    if (!file) return;
    setReading(true);
    const out = await shrinkPhoto(file);
    setReading(false);
    if (!out) {
      setProof(null);
      setErrors((e) => ({ ...e, proof: f.proofBad }));
      return;
    }
    setProof({ ...out, name: file.name });
    setErrors((e) => {
      const { proof: _p, ...rest } = e;
      return rest;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORM_URL || status === "sending") return;
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    for (const k of ["name", "email", "studentId"]) if (!v(k)) errs[k] = f.required;
    if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email"))) errs.email = f.required;
    if (!slotOk) errs.slot = slot ? f.noRoomForType : f.slotRequired;
    if (size > 1) {
      const lines = members.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length !== size) errs.members = f.membersCount.replace("{n}", String(size)).replace("{c}", String(lines.length));
      else if (lines.some((l) => !/\S+@\S+\.\S+/.test(l))) errs.members = f.membersEmail;
    }
    if (cfg.proof && !proof) errs.proof = f.proofRequired;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // a "simple" request: no CORS preflight
        body: JSON.stringify({
          game,
          type,
          headcount: size,
          slot,
          name: v("name"),
          email: v("email"),
          studentId: v("studentId"),
          phone: v("phone"),
          teamName: size > 1 ? v("teamName") : "",
          members: size > 1 ? members.trim() : "",
          promo: pricing && promoOn ? ESCAPE_PRICING.promoCode : undefined,
          proof: cfg.proof && proof ? { mime: proof.mime, data: proof.base64, name: proof.name } : undefined,
          at: new Date().toISOString(),
        }),
      });
      const json = await res.json();
      if (json?.ok) {
        setStatus("done");
      } else if (json?.error === "promo") {
        setPromoOn(false);
        setErrors({ promo: f.promoBad });
        setStatus("idle");
      } else if (json?.error === "proof" || json?.error === "proof_big" || json?.error === "proof_type") {
        setErrors({ proof: f.proofRejected });
        setStatus("idle");
      } else if (json?.error === "full") {
        setErrors({ slot: f.slotFullNow });
        setSlot("");
        setStatus("idle");
        void reload();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const slotInfo = slots.find((s) => s.id === slot);
  const typeInfo = g.types[type];

  return (
    <div className="hlw-modal-body">
      <button type="button" className="hlw-modal-x" onClick={onClose} aria-label={f.close}>
        ×
      </button>
      <h3 className="hlw-script text-3xl">{g.formTitle}</h3>

      {status === "done" ? (
        <div className="mt-6" role="status">
          <p className="hlw-title text-lg">{f.successTitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--hlw-bone)]/80">{f.successBody}</p>
          {slotInfo && (
            <p className="mt-4 text-sm">
              <span className="hlw-kicker mr-2">{f.successSlot}</span>
              {slotInfo.start} – {slotInfo.end}{typeInfo ? ` · ${typeInfo.name}` : ""}
            </p>
          )}
          <button type="button" className="hlw-btn hlw-btn-ghost mt-7" onClick={onClose}>
            {f.close}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
          {(
            <>
              <fieldset className="grid gap-2">
                <legend className="hlw-kicker mb-2">{f.typeLegend}</legend>
                <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
                  {((["solo", "group"]) as RegType[]).map((t) => (
                    <label key={t} className="hlw-slot">
                      <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
                      <span>
                        <b className="block text-[13px]">{g.types[t].name}</b>
                        <small className="block text-[11px] font-normal opacity-80">{g.types[t].note}</small>
                      </span>
                    </label>
                  ))}
                </div>
                {type === "group" && (
                  <div className="mt-1 flex items-center justify-between gap-3 rounded-lg border border-[rgba(222,217,196,0.2)] px-4 py-2.5">
                    <span className="hlw-kicker">{f.groupSizeLabel}</span>
                    <span className="flex items-center gap-3">
                      <button
                        type="button"
                        className="hlw-step"
                        onClick={() => setGroupSize((n) => Math.max(cfg.groupMin, n - 1))}
                        disabled={groupSize <= cfg.groupMin}
                        aria-label="−"
                      >
                        −
                      </button>
                      <b className="min-w-6 text-center text-lg" aria-live="polite">
                        {groupSize}
                      </b>
                      <button
                        type="button"
                        className="hlw-step"
                        onClick={() => setGroupSize((n) => Math.min(cfg.groupMax, n + 1))}
                        disabled={groupSize >= cfg.groupMax}
                        aria-label="+"
                      >
                        +
                      </button>
                    </span>
                  </div>
                )}
              </fieldset>

              <fieldset className="grid gap-2">
                <legend className="hlw-kicker mb-2">{f.slotLegend}</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-describedby={`${uid}-note`}>
                  {slots.map((s) => {
                    const l = left(s.id);
                    const ok = fits(s.id);
                    return (
                      <label key={s.id} className={`hlw-slot ${ok ? "" : "hlw-slot-off"}`}>
                        <input
                          type="radio"
                          name="slot"
                          value={s.id}
                          checked={slot === s.id}
                          disabled={!ok}
                          onChange={() => setSlot(s.id)}
                        />
                        <span>
                          {s.start} – {s.end}
                          {l !== null ? (
                            <small className="block text-[11px] font-normal opacity-80">
                              {l === 0 ? f.full : f.seatsLeft.replace("{n}", String(l))}
                            </small>
                          ) : (
                            loading && (
                              <small className="block text-[11px] font-normal opacity-60">{f.seatsLoading}</small>
                            )
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <p id={`${uid}-note`} className="text-xs leading-relaxed text-[color:var(--hlw-bone)]/60">
                  {g.slotNote}
                </p>
                {errors.slot && <p className="hlw-err">{errors.slot}</p>}
              </fieldset>
            </>
          )}

          <p className="text-xs leading-relaxed text-[color:var(--hlw-bone)]/60">{size > 1 ? f.contactNote : ""}</p>
          <Field id={`${uid}-name`} name="name" label={f.name} error={errors.name} autoComplete="name" />
          <Field id={`${uid}-email`} name="email" label={f.email} error={errors.email} type="email" autoComplete="email" />
          <Field id={`${uid}-sid`} name="studentId" label={f.studentId} error={errors.studentId} />
          <Field id={`${uid}-phone`} name="phone" label={f.phone} type="tel" autoComplete="tel" />

          {size > 1 && (
            <>
              <Field id={`${uid}-team`} name="teamName" label={f.teamName} />
              <div>
                <label htmlFor={`${uid}-members`} className="hlw-kicker mb-1.5 block">
                  {f.members} ({memberLines}/{size})
                </label>
                <textarea
                  id={`${uid}-members`}
                  rows={Math.min(size, 6)}
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="hlw-input"
                  aria-invalid={errors.members ? true : undefined}
                />
                <p className="mt-1 text-xs text-[color:var(--hlw-bone)]/60">{f.membersHint}</p>
                {errors.members && <p className="hlw-err mt-1">{errors.members}</p>}
              </div>
            </>
          )}

          {cfg.proof && (
            <fieldset className="grid gap-3 rounded-lg border border-[rgba(222,217,196,0.2)] p-4">
              <legend className="hlw-kicker px-1">{f.payTitle}</legend>

              {pricing && (
                <>
                  <dl className="grid gap-1.5 text-sm">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[color:var(--hlw-bone)]/70">{f.priceLabel}</dt>
                      <dd className="flex items-baseline gap-2">
                        {promoOn && (
                          <s className="text-[13px] text-[color:var(--hlw-bone)]/55">{money(pricing.price)}</s>
                        )}
                        <b className={promoOn ? "text-[color:var(--hlw-script)]" : ""}>
                          {money(unit)} <span className="text-[11px] font-normal opacity-70">{f.perPerson}</span>
                        </b>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[color:var(--hlw-bone)]/70">{f.peopleCount}</dt>
                      <dd>× {size}</dd>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between gap-3 border-t border-[rgba(222,217,196,0.18)] pt-2">
                      <dt className="hlw-kicker">{f.totalLabel}</dt>
                      <dd className="text-lg font-bold text-[color:var(--hlw-script)]">{money(total)}</dd>
                    </div>
                  </dl>

                  <div>
                    <label htmlFor={`${uid}-promo`} className="hlw-kicker mb-1.5 block">
                      {f.promoLabel}
                    </label>
                    <div className="flex gap-2">
                      <input
                        id={`${uid}-promo`}
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          if (promoOn) setPromoOn(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Enter applies the code, it must not submit the form
                            applyPromo();
                          }
                        }}
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        className="hlw-input"
                        aria-invalid={errors.promo ? true : undefined}
                      />
                      <button type="button" className="hlw-btn hlw-btn-ghost shrink-0" onClick={applyPromo} disabled={!promoInput.trim()}>
                        {f.promoApply}
                      </button>
                    </div>
                    {promoOn && <p className="mt-1.5 text-xs text-[color:var(--hlw-script)]">{f.promoOk}</p>}
                    {errors.promo && <p className="hlw-err mt-1.5">{errors.promo}</p>}
                  </div>
                </>
              )}

              <p className="text-xs leading-relaxed text-[color:var(--hlw-bone)]/70">{f.payLead}</p>
              {qrTry < QR_FILES.length ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={qrTry}
                  src={`/halloween/${QR_FILES[qrTry]}`}
                  alt=""
                  onError={() => setQrTry((i) => i + 1)}
                  className="mx-auto max-h-64 w-auto rounded-md bg-white p-2"
                />
              ) : (
                <p className="text-xs text-[color:var(--hlw-script)]">{f.payQrMissing}</p>
              )}
              <div>
                <label htmlFor={`${uid}-proof`} className="hlw-kicker mb-1.5 block">
                  {f.proofLabel}
                </label>
                <input
                  id={`${uid}-proof`}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => void onPick(e.target.files?.[0])}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <label htmlFor={`${uid}-proof`} className="hlw-btn hlw-btn-ghost cursor-pointer">
                    {reading ? f.proofReading : proof ? f.proofChange : f.proofChoose}
                  </label>
                  {proof && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={proof.preview} alt="" className="h-16 w-auto rounded border border-[rgba(222,217,196,0.3)]" />
                  )}
                </div>
                {errors.proof && <p className="hlw-err mt-1.5">{errors.proof}</p>}
              </div>
            </fieldset>
          )}

          {!FORM_URL && <p className="text-xs leading-relaxed text-[color:var(--hlw-script)]">{f.notOpen}</p>}
          {status === "error" && <p className="hlw-err">{f.error}</p>}

          <button type="submit" className="hlw-btn mt-2 justify-self-start" disabled={!FORM_URL || status === "sending"}>
            {status === "sending" ? f.sending : f.submit}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="hlw-kicker mb-1.5 block">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="hlw-input"
        aria-invalid={error ? true : undefined}
      />
      {error && <p className="hlw-err mt-1">{error}</p>}
    </div>
  );
}
