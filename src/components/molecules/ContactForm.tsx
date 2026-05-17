"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { TextArea, TextField } from "@/components/atoms/TextField";
import { trackContactFormError, trackContactFormSubmitted } from "@/lib/analytics";
import { plans, type PlanIntent } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  selectedPlanSlug?: string;
  intent?: string;
  source?: string;
};

const intentLabels: Record<PlanIntent | "general", string> = {
  "discovery-call": "Discovery call",
  quote: "Quote request",
  general: "General enquiry",
};

function normaliseIntent(value?: string): PlanIntent | "general" {
  return value === "discovery-call" || value === "quote" ? value : "general";
}

export function ContactForm({ selectedPlanSlug, intent, source }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const selectedPlan = plans.find((plan) => plan.slug === selectedPlanSlug);
  const selectedIntent = normaliseIntent(intent);
  const trackingPlan = selectedPlan?.slug ?? "not-selected";
  const trackingSource = source ?? "contact";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks. Nodo will review your message and get back to you soon.");
      trackContactFormSubmitted({
        plan: trackingPlan,
        intent: selectedIntent,
        source: trackingSource,
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Something went wrong.";

      setStatus("error");
      setMessage(reason);
      trackContactFormError({
        plan: trackingPlan,
        intent: selectedIntent,
        source: trackingSource,
        reason,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <input type="hidden" name="intent" value={selectedIntent} />
      <input type="hidden" name="source" value={trackingSource} />
      {selectedPlan ? <input type="hidden" name="plan" value={selectedPlan.slug} /> : null}

      {selectedPlan || selectedIntent !== "general" ? (
        <div className="rounded-3xl border border-nodo-lavender/30 bg-nodo-purple/15 p-4 text-sm leading-6 text-white/72">
          {selectedPlan ? (
            <p>
              <span className="font-semibold text-white">Selected plan:</span> {selectedPlan.name}
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-white">Inquiry type:</span>{" "}
            {intentLabels[selectedIntent]}
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" autoComplete="name" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <TextField label="Company" name="company" autoComplete="organization" />
      <TextArea
        label="What should we build or improve?"
        name="message"
        placeholder={
          selectedPlan
            ? `Tell us what you want to achieve with ${selectedPlan.name}.`
            : "Tell us about the workflow, platform, or system you want to create."
        }
        required
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === "submitting"}
          icon={<Send aria-hidden="true" className="size-4" />}
          dataTestId="contact-form-submit-button"
        >
          {status === "submitting" ? "Sending" : "Send message"}
        </Button>
        {message ? (
          <p
            className={
              status === "success"
                ? "text-sm font-medium text-nodo-lavender"
                : "text-sm font-medium text-red-300"
            }
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
