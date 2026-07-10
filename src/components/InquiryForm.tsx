"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, ClipboardCopy, MailCheck } from "lucide-react";
import {
  buildInquiryEmailBody,
  buildInquiryMailto,
  inquiryTypes,
  type InquiryPayload,
  type InquiryType
} from "@/lib/inquiry";
import { site } from "@/lib/site";

type InquiryFormProps = {
  defaultType?: InquiryType;
  defaultMessage?: string;
  sourceLabel?: string;
};

type InquiryErrors = Partial<Record<keyof InquiryPayload, string>>;

const emptyPayload: InquiryPayload = {
  name: "",
  email: "",
  company: "",
  type: "Personal gift",
  quantity: "",
  timing: "",
  message: "",
  source: ""
};

function isInquiryType(value: string): value is InquiryType {
  return inquiryTypes.includes(value as InquiryType);
}

function validateInquiry(payload: InquiryPayload) {
  const errors: InquiryErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.name.trim()) errors.name = "Please enter your name.";
  if (!payload.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.type) errors.type = "Please choose an inquiry type.";
  if (payload.message.trim().length < 12) {
    errors.message = "Please share a little more detail so we can respond usefully.";
  }

  return errors;
}

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  return Promise.resolve();
}

export function InquiryForm({
  defaultType = "Personal gift",
  defaultMessage = "",
  sourceLabel = "Contact page"
}: InquiryFormProps) {
  const [payload, setPayload] = useState<InquiryPayload>({
    ...emptyPayload,
    type: defaultType,
    message: defaultMessage,
    source: sourceLabel
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "opening" | "copied">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const message = params.get("message");
    const source = params.get("source");

    setPayload((current) => ({
      ...current,
      type: type && isInquiryType(type) ? type : current.type,
      message: message || current.message,
      source: source || current.source
    }));
  }, []);

  const emailBody = useMemo(() => buildInquiryEmailBody(payload), [payload]);
  const mailtoHref = useMemo(() => buildInquiryMailto(payload), [payload]);
  const hasErrors = Object.keys(errors).length > 0;

  function updateField<Field extends keyof InquiryPayload>(field: Field, value: InquiryPayload[Field]) {
    setPayload((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (String(formData.get("website") ?? "").trim()) return;

    const nextErrors = validateInquiry(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("opening");
    window.location.href = mailtoHref;
  }

  async function handleCopy() {
    await copyToClipboard(`${emailBody}\n\nSend to: ${site.email}`);
    setStatus("copied");
  }

  return (
    <form
      id="inquiry-form"
      className="grid gap-5 border border-ink/10 bg-porcelain p-5 shadow-soft md:p-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Name
          <input
            name="name"
            value={payload.name}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("name", event.target.value)}
          />
          {errors.name ? (
            <span id="inquiry-name-error" className="text-xs font-semibold text-seal">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Email
          <input
            name="email"
            type="email"
            value={payload.email}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("email", event.target.value)}
          />
          {errors.email ? (
            <span id="inquiry-email-error" className="text-xs font-semibold text-seal">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Company
          <input
            name="company"
            value={payload.company}
            autoComplete="organization"
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("company", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Inquiry type
          <select
            name="type"
            value={payload.type}
            aria-invalid={Boolean(errors.type)}
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("type", event.target.value as InquiryType)}
          >
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Approximate quantity
          <input
            name="quantity"
            value={payload.quantity}
            inputMode="numeric"
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("quantity", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink/78">
          Preferred timing
          <input
            name="timing"
            value={payload.timing}
            placeholder="e.g. August settlement gifts"
            className="h-12 border border-ink/12 bg-white px-4 text-base outline-none transition focus:border-leaf"
            onChange={(event) => updateField("timing", event.target.value)}
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-ink/78">
        Message
        <textarea
          name="message"
          rows={5}
          value={payload.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "inquiry-message-error" : undefined}
          className="border border-ink/12 bg-white px-4 py-3 text-base outline-none transition focus:border-leaf"
          onChange={(event) => updateField("message", event.target.value)}
        />
        {errors.message ? (
          <span id="inquiry-message-error" className="text-xs font-semibold text-seal">
            {errors.message}
          </span>
        ) : null}
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="button-primary">
          Send inquiry <ArrowRight size={17} />
        </button>
        <button type="button" className="button-secondary" onClick={handleCopy}>
          Copy inquiry <ClipboardCopy size={17} />
        </button>
      </div>
      <div className="grid gap-2 text-xs leading-6 text-ink/58" aria-live="polite">
        {hasErrors ? (
          <p className="font-semibold text-seal">Please fix the highlighted fields before sending.</p>
        ) : null}
        {status === "opening" ? (
          <p className="flex max-w-xl items-start gap-2">
            <MailCheck className="mt-1 shrink-0 text-leaf" size={15} />
            Your email app should open with the inquiry ready to send. If it does not, use
            Copy inquiry and send it to{" "}
            <a className="font-semibold text-leaf underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        ) : status === "copied" ? (
          <p>
            Inquiry copied. Send it to{" "}
            <a className="font-semibold text-leaf underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        ) : (
          <p className="max-w-xl">
            This GitHub Pages friendly form opens your email app with the inquiry prepared.
            You can also copy the inquiry if your browser blocks mail links.
          </p>
        )}
      </div>
    </form>
  );
}
