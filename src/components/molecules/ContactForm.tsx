"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { TextArea, TextField } from "@/components/atoms/TextField";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" autoComplete="name" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <TextField label="Company" name="company" autoComplete="organization" />
      <TextArea
        label="What should we build or improve?"
        name="message"
        placeholder="Tell us about the workflow, platform, or system you want to create."
        required
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status === "submitting"}
          icon={<Send aria-hidden="true" className="size-4" />}
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
