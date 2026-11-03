'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import {
  trackPlanFinderAnswered,
  trackPlanFinderCompleted,
  trackPlanFinderCtaClicked,
  trackPlanFinderOpened
} from '@/lib/analytics';
import {
  PLAN_FINDER_STORAGE_KEY,
  buildPlanFinderSummary,
  getPlanContactHref,
  getPlanHref,
  getPlanName,
  getPlanPrice,
  getVisibleQuestions,
  recommendPlan,
  type PlanFinderAnswers
} from '@/lib/plan-finder';
import { cn } from '@/lib/utils';

type PlanFinderButtonProps = {
  location: string;
  label?: string;
  variant?: 'primary' | 'secondary';
  surfaceTone?: 'dark' | 'light';
  className?: string;
  dataTestId?: string;
};

export function PlanFinderButton({
  location,
  label = 'Help me choose a plan',
  variant = 'secondary',
  surfaceTone = 'dark',
  className,
  dataTestId = 'plan-finder-open-button'
}: PlanFinderButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
    trackPlanFinderOpened(location);
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        surfaceTone={surfaceTone}
        className={className}
        dataTestId={dataTestId}
        aria-haspopup="dialog"
        onClick={open}
      >
        {label}
      </Button>
      <PlanFinderDialog dialogRef={dialogRef} isOpen={isOpen} onClosed={() => setIsOpen(false)} />
    </>
  );
}

type PlanFinderDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  onClosed: () => void;
};

function PlanFinderDialog({ dialogRef, isOpen, onClosed }: PlanFinderDialogProps) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [answers, setAnswers] = useState<PlanFinderAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const questions = getVisibleQuestions(answers);
  const isResult = stepIndex >= questions.length;
  const question = questions[stepIndex];
  const recommendation = isResult ? recommendPlan(answers) : null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      headingRef.current?.focus();
    }
  }, [isOpen, stepIndex]);

  const close = () => dialogRef.current?.close();

  const reset = () => {
    setAnswers({});
    setStepIndex(0);
  };

  const answer = (value: string) => {
    if (!question) {
      return;
    }

    const nextAnswers = { ...answers, [question.id]: value };
    const nextQuestions = getVisibleQuestions(nextAnswers);
    const prunedAnswers = Object.fromEntries(
      nextQuestions.flatMap((item) => (nextAnswers[item.id] ? [[item.id, nextAnswers[item.id]]] : []))
    ) as PlanFinderAnswers;

    trackPlanFinderAnswered({ question: question.id, answer: value });
    setAnswers(prunedAnswers);
    setStepIndex(stepIndex + 1);

    if (stepIndex + 1 >= nextQuestions.length) {
      const result = recommendPlan(prunedAnswers);
      trackPlanFinderCompleted({ plan: result.plan, alternative: result.alternative });
    }
  };

  const storeSummary = () => {
    if (!recommendation) {
      return;
    }

    try {
      window.sessionStorage.setItem(PLAN_FINDER_STORAGE_KEY, buildPlanFinderSummary(answers, recommendation));
    } catch {
      // Storage can be unavailable (private mode); the plan still travels in the URL.
    }
  };

  const progress = Math.round((Math.min(stepIndex, questions.length) / questions.length) * 100);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      data-testid="plan-finder-dialog"
      className="plan-finder-dialog m-auto w-[min(40rem,calc(100%-2rem))] overflow-visible rounded-[2rem] border border-white/12 bg-nodo-black p-0 text-white shadow-[0_30px_110px_rgba(0,0,0,0.5)] backdrop:bg-nodo-black/72 backdrop:backdrop-blur-sm max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:border-0"
      onClose={() => {
        onClosed();
        reset();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div className="relative flex h-full flex-col overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-nodo-lavender">
            {isResult ? 'Our recommendation' : `Plan finder · ${stepIndex + 1} of ${questions.length}`}
          </p>
          <button
            type="button"
            aria-label="Close plan finder"
            data-testid="plan-finder-close-button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.055] text-white transition hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-lavender"
            onClick={close}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"
          data-testid="plan-finder-progress"
        >
          <div
            className="h-full rounded-full bg-nodo-purple transition-[width] duration-500 ease-out"
            style={{ width: `${isResult ? 100 : progress}%` }}
          />
        </div>

        <div key={isResult ? 'result' : question?.id} className="plan-finder-step mt-8 flex flex-1 flex-col">
          {question && !isResult ? (
            <>
              <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                data-testid="plan-finder-question"
                className="text-balance text-3xl font-black leading-[1] tracking-normal outline-none sm:text-4xl"
              >
                {question.title}
              </h2>
              {question.hint ? <p className="mt-3 text-sm leading-6 text-white/68">{question.hint}</p> : null}
              <ul className="mt-7 grid gap-3" data-testid="plan-finder-options">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.value;

                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        data-testid={`plan-finder-option-${question.id}-${option.value}`}
                        className={cn(
                          'group flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition duration-200 hover:border-nodo-lavender/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-lavender',
                          isSelected ? 'border-nodo-purple bg-nodo-purple/18' : 'border-white/12 bg-white/[0.045]'
                        )}
                        onClick={() => answer(option.value)}
                      >
                        <span>
                          <span className="block text-base font-black text-white">{option.label}</span>
                          {option.hint ? (
                            <span className="mt-1 block text-sm leading-5 text-white/64">{option.hint}</span>
                          ) : null}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition',
                            isSelected
                              ? 'border-nodo-purple bg-nodo-purple text-white'
                              : 'border-white/18 text-transparent group-hover:text-white/50'
                          )}
                        >
                          {isSelected ? (
                            <Check className="size-4" />
                          ) : (
                            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}

          {recommendation ? (
            <div data-testid="plan-finder-result">
              <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                data-testid="plan-finder-result-plan"
                className="text-4xl font-black leading-[1] tracking-normal outline-none sm:text-5xl"
              >
                {getPlanName(recommendation.plan)}
              </h2>
              {getPlanPrice(recommendation.plan) ? (
                <p className="mt-3 text-lg font-black text-nodo-lavender">{getPlanPrice(recommendation.plan)}</p>
              ) : null}
              <ul className="mt-6 grid gap-3" data-testid="plan-finder-result-reasons">
                {recommendation.reasons.map((reason) => (
                  <li key={reason} className="flex gap-3 text-base leading-6 text-white/80">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-nodo-lavender" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={getPlanHref(recommendation.plan)}
                  dataTestId="plan-finder-view-plan-button"
                  onClick={() => {
                    trackPlanFinderCtaClicked({ plan: recommendation.plan, action: 'view-plan' });
                    close();
                  }}
                >
                  View {getPlanName(recommendation.plan)}
                </Button>
                <Button
                  href={getPlanContactHref(recommendation.plan)}
                  variant="secondary"
                  dataTestId="plan-finder-contact-button"
                  onClick={() => {
                    trackPlanFinderCtaClicked({ plan: recommendation.plan, action: 'contact' });
                    storeSummary();
                    close();
                  }}
                >
                  Talk about this plan
                </Button>
              </div>
              {recommendation.alternative ? (
                <p className="mt-6 text-sm leading-6 text-white/68" data-testid="plan-finder-alternative">
                  Also worth a look:{' '}
                  <Link
                    href={getPlanHref(recommendation.alternative)}
                    className="font-black text-nodo-lavender underline decoration-nodo-lavender/40 underline-offset-4 transition hover:text-white"
                    onClick={close}
                  >
                    {getPlanName(recommendation.alternative)}
                  </Link>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          {stepIndex > 0 && !isResult ? (
            <button
              type="button"
              data-testid="plan-finder-back-button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-nodo-lavender"
              onClick={() => setStepIndex(stepIndex - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back
            </button>
          ) : isResult ? (
            <button
              type="button"
              data-testid="plan-finder-restart-button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-nodo-lavender"
              onClick={reset}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Start again
            </button>
          ) : (
            <span />
          )}
          <p className="text-right text-xs leading-5 text-white/60">Indicative prices, GST exclusive.</p>
        </div>
      </div>
    </dialog>
  );
}
