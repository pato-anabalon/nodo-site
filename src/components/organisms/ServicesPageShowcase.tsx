import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServicesPageShowcase() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        const isReversed = index % 2 === 1;
        const accentClasses = [
          "from-nodo-purple/18 via-transparent to-nodo-pink/14",
          "from-nodo-pink/16 via-transparent to-nodo-violet/16",
          "from-nodo-lavender/16 via-transparent to-nodo-purple/18",
        ];
        const accentClass = accentClasses[index % accentClasses.length];

        return (
          <ScrollReveal key={service.title} delay={index * 0.04}>
            <article className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 transition duration-300 hover:border-nodo-lavender/45 hover:bg-white/[0.06] sm:p-8 lg:p-10">
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90 transition duration-300 group-hover:opacity-100",
                  accentClass,
                )}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-10">
                <div className={cn("space-y-6", isReversed && "lg:order-2")}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-nodo-lavender/90">
                        {service.eyebrow}
                      </p>
                      <h3 className="mt-4 max-w-xl text-balance text-3xl font-black leading-[0.92] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3.25rem]">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white shadow-[0_0_36px_rgba(124,58,237,0.18)] sm:size-16">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                  </div>
                  <p className="max-w-2xl text-pretty text-base leading-8 text-white/68 sm:text-lg">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                    <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/34">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-xl text-pretty text-sm leading-7 text-white/72 sm:text-base">
                      {service.highlight}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-[1.75rem] border border-white/10 bg-nodo-ink/72 p-6 sm:p-7",
                    isReversed && "lg:order-1",
                  )}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/42">
                    What this includes
                  </p>
                  <ul className="mt-5 space-y-4">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-7 text-white/74 sm:text-base"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-nodo-lavender" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <Button
                      href={service.href}
                      variant="secondary"
                      className="w-full justify-between rounded-2xl border-white/12 bg-white/6 px-4 py-3 text-left hover:border-nodo-lavender/55 hover:bg-white/10"
                      icon={<ArrowRight aria-hidden="true" className="size-4" />}
                    >
                      {service.ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
