import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/32 focus:border-nodo-lavender/80 focus:bg-white/[0.09]";

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <label className="block text-sm font-semibold text-white/78">
      {label}
      <input className={cn(fieldClass, className)} {...props} />
    </label>
  );
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <label className="block text-sm font-semibold text-white/78">
      {label}
      <textarea className={cn(fieldClass, "min-h-36 resize-y", className)} {...props} />
    </label>
  );
}
