"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { escapeSlots } from "@/lib/halloween-games";
import { Branch } from "./Scene";

/**
 * The two Halloween games, hung from the branch. Pressing a card opens a
 * registration dialog (native <dialog>: focus trap, Esc, backdrop for free).
 * The escape room's form also has the session picker.
 *
 * Submissions are POSTed as JSON to NEXT_PUBLIC_HLW_FORM_URL (for example a
 * Google Apps Script web app writing to a Sheet). Until that is set the form
 * says registration is not open yet instead of pretending to send.
 */

type GameCopy = {
  tag: string;
  name: string;
  desc: string;
  facts: readonly string[];
  cta: string;
  formTitle: string;
};

export type GamesCopy = {
  hunt: GameCopy;
  escape: GameCopy;
  form: {
    name: string;
    email: string;
    studentId: string;
    phone: string;
    slotLegend: string;
    slotNote: string;
    slotRequired: string;
    required: string;
    submit: string;
    sending: string;
    close: string;
    successTitle: string;
    successBody: string;
    successSlot: string;
    error: string;
    notOpen: string;
  };
};

type GameId = "hunt" | "escape";

const FORM_URL = process.env.NEXT_PUBLIC_HLW_FORM_URL ?? "";
const MASK: Record<GameId, { src: string; w: number; h: number }> = {
  hunt: { src: "mask-meo.webp", w: 150, h: 189 },
  escape: { src: "mask-cu.webp", w: 104, h: 163 },
};
const SLOTS = escapeSlots();

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
  const [game, setGame] = useState<GameId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (game && !d.open) d.showModal();
    if (!game && d.open) d.close();
  }, [game]);

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
                  <button
                    type="button"
                    onClick={() => setGame(id)}
                    className="hlw-card hlw-game block w-full px-6 pb-7 pt-8 text-center"
                    aria-haspopup="dialog"
                  >
                    <span className="flex h-[170px] items-center justify-center">
                      <Image
                        src={`/halloween/${m.src}`}
                        alt=""
                        width={m.w}
                        height={m.h}
                        unoptimized
                        className="hlw-pixel hlw-mask h-auto max-h-[160px] w-auto"
                      />
                    </span>
                    <span className="hlw-plaque mt-5 inline-block">{g.tag}</span>
                    <span className="hlw-title mt-4 block text-lg">{g.name}</span>
                    <span className="mx-auto mt-3 block max-w-sm text-[13px] leading-relaxed text-[color:var(--hlw-bone)]/75">
                      {g.desc}
                    </span>
                    <span className="mt-4 flex flex-wrap justify-center gap-2">
                      {g.facts.map((f) => (
                        <span key={f} className="hlw-fact">
                          {f}
                        </span>
                      ))}
                    </span>
                    <span className="hlw-btn mt-6 inline-flex">{g.cta}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="hlw hlw-modal"
        onClose={() => setGame(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setGame(null);
        }}
      >
        {game && <RegisterForm key={game} game={game} copy={copy} onClose={() => setGame(null)} />}
      </dialog>
    </section>
  );
}

type Status = "idle" | "sending" | "done" | "error";

function RegisterForm({ game, copy, onClose }: { game: GameId; copy: GamesCopy; onClose: () => void }) {
  const g = copy[game];
  const f = copy.form;
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORM_URL || status === "sending") return;
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    for (const k of ["name", "email", "studentId"]) if (!v(k)) errs[k] = f.required;
    if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email"))) errs.email = f.required;
    if (game === "escape" && !slot) errs.slot = f.slotRequired;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script answers without CORS headers; a resolved fetch means it was sent
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          game,
          name: v("name"),
          email: v("email"),
          studentId: v("studentId"),
          phone: v("phone"),
          slot: game === "escape" ? slot : "",
          at: new Date().toISOString(),
        }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const slotInfo = SLOTS.find((s) => s.id === slot);

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
              {slotInfo.start} – {slotInfo.end}
            </p>
          )}
          <button type="button" className="hlw-btn hlw-btn-ghost mt-7" onClick={onClose}>
            {f.close}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
          {game === "escape" && (
            <fieldset className="grid gap-2">
              <legend className="hlw-kicker mb-2">{f.slotLegend}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-describedby={`${uid}-note`}>
                {SLOTS.map((s) => (
                  <label key={s.id} className="hlw-slot">
                    <input
                      type="radio"
                      name="slot"
                      value={s.id}
                      checked={slot === s.id}
                      onChange={() => setSlot(s.id)}
                    />
                    <span>
                      {s.start} – {s.end}
                    </span>
                  </label>
                ))}
              </div>
              <p id={`${uid}-note`} className="text-xs leading-relaxed text-[color:var(--hlw-bone)]/60">
                {f.slotNote}
              </p>
              {errors.slot && <p className="hlw-err">{errors.slot}</p>}
            </fieldset>
          )}

          <Field id={`${uid}-name`} name="name" label={f.name} error={errors.name} autoComplete="name" />
          <Field id={`${uid}-email`} name="email" label={f.email} error={errors.email} type="email" autoComplete="email" />
          <Field id={`${uid}-sid`} name="studentId" label={f.studentId} error={errors.studentId} />
          <Field id={`${uid}-phone`} name="phone" label={f.phone} type="tel" autoComplete="tel" />

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
