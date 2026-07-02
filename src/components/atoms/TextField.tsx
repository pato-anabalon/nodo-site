import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassName?: string;
  surfaceTone?: 'dark' | 'light';
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  footer?: ReactNode;
  labelClassName?: string;
  surfaceTone?: 'dark' | 'light';
};

const darkFieldClass =
  'mt-2 w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/32 focus:border-nodo-lavender/80 focus:bg-white/[0.09]';
const lightFieldClass =
  'mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-nodo-black outline-none transition placeholder:text-nodo-ink/34 focus:border-nodo-purple/70 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)]';

const labelToneClass = {
  dark: 'text-white/78',
  light: 'text-nodo-ink/72'
};

const fieldToneClass = {
  dark: darkFieldClass,
  light: lightFieldClass
};

export function TextField({ label, className, labelClassName, surfaceTone = 'dark', ...props }: TextFieldProps) {
  return (
    <label className={cn('block text-sm font-semibold', labelToneClass[surfaceTone], labelClassName)}>
      {label}
      <input className={cn(fieldToneClass[surfaceTone], className)} {...props} />
    </label>
  );
}

export function TextArea({ label, className, footer, labelClassName, surfaceTone = 'dark', ...props }: TextAreaProps) {
  return (
    <label className={cn('block text-sm font-semibold', labelToneClass[surfaceTone], labelClassName)}>
      {label}
      <div className="relative">
        <textarea
          className={cn(fieldToneClass[surfaceTone], 'min-h-36 resize-y', footer ? 'pb-10' : null, className)}
          {...props}
        />
        {footer ? (
          <div className="pointer-events-none absolute bottom-3 right-4 text-xs font-semibold text-nodo-ink/42">
            {footer}
          </div>
        ) : null}
      </div>
    </label>
  );
}
