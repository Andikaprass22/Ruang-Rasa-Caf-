import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { restaurant } from "../../lib/data";
import type { ReservationInput } from "../../lib/types";
import {
  buildReservationMessage,
  buildWhatsAppUrl,
  cn,
  getTodayHours,
} from "../../lib/utils";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { WhatsAppButton } from "../ui/WhatsAppButton";

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  note: "",
};

const fieldOrder: (keyof FormState)[] = ["name", "phone", "date", "time", "guests"];

const fieldClass =
  "mt-2 w-full rounded-sm border border-espresso/45 bg-ivory px-3 py-2.5 text-base text-espresso transition-colors placeholder:text-taupe focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta sm:text-sm";

const labelClass =
  "block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-mocha";

function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: string;
  min?: string | number;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric";
  placeholder?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  min,
  autoComplete,
  inputMode,
  placeholder,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClass, error && "border-terracotta")}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-terracotta">
          Wajib diisi
        </p>
      )}
    </div>
  );
}

export function Reservation() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const today = getTodayHours(restaurant.hours);
  const todayLabel = today
    ? today.closed
      ? "Tutup"
      : `${today.open} – ${today.close}`
    : "—";

  const update =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  function validate(data: FormState): Record<string, boolean> {
    const next: Record<string, boolean> = {};
    if (!data.name.trim()) next.name = true;
    if (!data.phone.trim()) next.phone = true;
    if (!data.date) next.date = true;
    if (!data.time) next.time = true;
    if (!data.guests || Number(data.guests) < 1) next.guests = true;
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstInvalid = fieldOrder.find((key) => found[key]);
      if (firstInvalid) document.getElementById(`res-${firstInvalid}`)?.focus();
      return;
    }

    const input: ReservationInput = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      note: form.note.trim() || undefined,
    };

    const url = buildWhatsAppUrl(
      restaurant.whatsapp,
      buildReservationMessage(restaurant.name, input),
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reservasi" className="scroll-mt-20 border-y border-sand bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
        <div>
          <SectionHeading
            eyebrow="Reservasi"
            title="Pesan tempat atau menu"
            description="Isi data singkat berikut, lalu lanjutkan lewat WhatsApp."
          />

          <dl className="mt-8 max-w-sm border-t border-sand pt-4 text-sm">
            <div className="flex items-center justify-between gap-4 py-1.5">
              <dt className="text-mocha">Jam hari ini</dt>
              <dd className="font-medium text-espresso">{todayLabel}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5">
              <dt className="text-mocha">WhatsApp</dt>
              <dd className="font-medium text-espresso">{restaurant.phone}</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-sand bg-cream p-6 sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="res-name"
              label="Nama"
              value={form.name}
              onChange={update("name")}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="res-phone"
              label="No. HP"
              value={form.phone}
              onChange={update("phone")}
              error={errors.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
            <Field
              id="res-date"
              label="Tanggal"
              value={form.date}
              onChange={update("date")}
              error={errors.date}
              type="date"
              min={todayISO()}
            />
            <Field
              id="res-time"
              label="Jam"
              value={form.time}
              onChange={update("time")}
              error={errors.time}
              type="time"
            />
            <Field
              id="res-guests"
              label="Jumlah Tamu"
              value={form.guests}
              onChange={update("guests")}
              error={errors.guests}
              type="number"
              min={1}
              inputMode="numeric"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="res-note" className={labelClass}>
              Catatan (opsional)
            </label>
            <textarea
              id="res-note"
              rows={3}
              value={form.note}
              onChange={update("note")}
              placeholder="Contoh: meja dekat jendela"
              className={cn(fieldClass, "resize-none")}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-sand pt-6">
            <Button type="submit">Pesan via WhatsApp</Button>
            <WhatsAppButton
              phone={restaurant.whatsapp}
              message={`Halo ${restaurant.name}, saya ingin bertanya soal reservasi.`}
              label="Tanya lewat WhatsApp"
              variant="outline"
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-taupe">
            Kami akan mengonfirmasi ketersediaan meja lewat WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}
