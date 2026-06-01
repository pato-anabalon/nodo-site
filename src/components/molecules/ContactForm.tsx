"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { TextArea, TextField } from "@/components/atoms/TextField";
import { trackContactFormError, trackContactFormSubmitted } from "@/lib/analytics";
import { allPlanOptions, type PlanIntent } from "@/lib/content";

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

const MESSAGE_MAX_LENGTH = 1500;

function normaliseIntent(value?: string): PlanIntent | "general" {
  return value === "discovery-call" || value === "quote" ? value : "general";
}

function getPlanType(plan: (typeof allPlanOptions)[number] | undefined) {
  if (!plan) {
    return "";
  }

  if ("category" in plan && plan.category === "Bundle") {
    return "All-in-One Bundle";
  }

  if ("category" in plan && (plan.category === "Marketing" || plan.category === "Branding")) {
    return "Marketing & Branding";
  }

  return "Website";
}

export function ContactForm({ selectedPlanSlug, intent, source }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const selectedPlan = allPlanOptions.find((plan) => plan.slug === selectedPlanSlug);
  const selectedIntent = normaliseIntent(intent);
  const selectedPlanType = getPlanType(selectedPlan);
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
      setLeadMessage("");
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
    <form data-testid="contact-form" onSubmit={handleSubmit} className="grid gap-5">
      <input type="hidden" name="intent" value={selectedIntent} />
      <input type="hidden" name="source" value={trackingSource} />
      {selectedPlan ? <input type="hidden" name="plan" value={selectedPlan.slug} /> : null}

      {selectedPlan || selectedIntent !== "general" ? (
        <div data-testid="contact-form-context-card" className="rounded-3xl border border-nodo-purple/18 bg-nodo-purple/[0.06] p-4 text-sm leading-6 text-nodo-ink/66">
          {selectedPlan ? (
            <p>
              <span className="font-semibold text-nodo-black">Selected plan:</span>{" "}
              {selectedPlan.name}
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-nodo-black">Inquiry type:</span>{" "}
            {intentLabels[selectedIntent]}
          </p>
        </div>
      ) : null}

      {selectedPlan ? (
        <div data-testid="contact-form-plan-context-fields" className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Plan type"
            name="planType"
            value={selectedPlanType}
            data-testid="contact-form-plan-type-field"
            readOnly
            surfaceTone="light"
          />
          <TextField
            label="Plan selected"
            name="planSelected"
            value={selectedPlan.name}
            data-testid="contact-form-plan-selected-field"
            readOnly
            surfaceTone="light"
          />
        </div>
      ) : null}

      <div data-testid="contact-form-name-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          autoComplete="given-name"
          data-testid="contact-form-name-field"
          required
          surfaceTone="light"
        />
        <TextField
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          data-testid="contact-form-last-name-field"
          required
          surfaceTone="light"
        />
      </div>
      <div data-testid="contact-form-contact-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          data-testid="contact-form-email-field"
          required
          surfaceTone="light"
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="contact-form-phone-field"
          surfaceTone="light"
        />
      </div>
      <div data-testid="contact-form-company-location-row" className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          data-testid="contact-form-company-field"
          surfaceTone="light"
        />
        <TextField
          label="City"
          name="city"
          autoComplete="address-level2"
          data-testid="contact-form-city-field"
          surfaceTone="light"
        />
      </div>
      <TextArea
        label="Message"
        name="message"
        data-testid="contact-form-message-field"
        maxLength={MESSAGE_MAX_LENGTH}
        value={leadMessage}
        onChange={(event) => setLeadMessage(event.currentTarget.value)}
        placeholder={
          selectedPlan
            ? `Tell us what you want to achieve with ${selectedPlan.name}.`
            : "Tell us about the workflow, platform, or system you want to create."
        }
        footer={`${leadMessage.length}/${MESSAGE_MAX_LENGTH}`}
        required
        surfaceTone="light"
      />
      <div data-testid="contact-form-actions" className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === "submitting"}
          icon={<Send aria-hidden="true" className="size-4" />}
          dataTestId="contact-form-submit-button"
          surfaceTone="light"
        >
          {status === "submitting" ? "Sending" : "Send message"}
        </Button>
        {message ? (
          <p
            className={
              status === "success"
                ? "text-sm font-medium text-nodo-purple"
                : "text-sm font-medium text-red-600"
            }
            role="status"
            data-testid="contact-form-status-message"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
