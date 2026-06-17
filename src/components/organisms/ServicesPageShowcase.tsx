import { ArrowRight } from "lucide-react";
import { TrackedCtaButton } from "@/components/molecules/TrackedCtaButton";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { services } from "@/lib/content";
import { cn, testIdSlug } from "@/lib/utils";

export function ServicesPageShowcase() {
  return (
    <div data-testid="services-showcase-list" className="space-y-5 sm:space-y-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        const isReversed = index % 2 === 1;
        const slug = testIdSlug(service.title);
        const accentClasses = [
          "from-nodo-purple/18 via-transparent to-nodo-pink/14",
          "from-nodo-pink/16 via-transparent to-nodo-violet/16",
          "from-nodo-lavender/16 via-transparent to-nodo-purple/18",
        ];
        const accentClass = accentClasses[index % accentClasses.length];

        return (
          <ScrollReveal key={service.title} delay={index * 0.04}>
            <article data-testid={`services-showcase-card-${slug}`} className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-6 transition duration-300 hover:border-nodo-purple/55 hover:bg-white/[0.06] hover:shadow-[0_18px_54px_rgba(124,58,237,0.18)] sm:p-8 lg:p-10">
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90 transition duration-300 group-hover:opacity-100",
                  accentClass,
                )}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-10">
                <div data-testid={`services-showcase-card-${slug}-content`} className={cn("relative space-y-6 overflow-hidden", isReversed && "lg:order-2")}>
                  <span
                    aria-hidden="true"
                    data-testid={`services-showcase-card-${slug}-number`}
                    className={cn(
                      "pointer-events-none absolute top-[78%] z-0 -translate-y-1/2 text-[6rem] font-black leading-none tracking-normal text-nodo-purple/[0.10] transition duration-300 group-hover:text-nodo-purple/[0.16] sm:text-[7rem]",
                      isReversed ? "right-0" : "left-0",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p data-testid={`services-showcase-card-${slug}-eyebrow`} className="text-xs font-semibold uppercase tracking-[0.26em] text-nodo-lavender/90">
                        {service.eyebrow}
                      </p>
                      <h3 data-testid={`services-showcase-card-${slug}-title`} className="mt-4 max-w-xl text-balance text-3xl font-black leading-[0.92] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3.25rem]">
                        {service.title}
                      </h3>
                    </div>
                    <div data-testid={`services-showcase-card-${slug}-icon`} className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white shadow-[0_0_36px_rgba(124,58,237,0.18)] sm:size-16">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                  </div>
                  <p data-testid={`services-showcase-card-${slug}-description`} className="relative z-10 max-w-2xl text-pretty text-base leading-8 text-white/68 sm:text-lg">
                    {service.description}
                  </p>
                  <div
                    data-testid={`services-showcase-card-${slug}-best-when`}
                    className="relative z-10 rounded-[1.25rem] border border-white/12 bg-white/[0.055] px-4 py-3"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-nodo-lavender">
                      Best when
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/72">
                      {service.bestWhen}
                    </p>
                  </div>
                  <div data-testid={`services-showcase-card-${slug}-highlight`} className="relative z-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                    <p className="max-w-xl text-pretty text-sm leading-7 text-white/72 sm:text-base">
                      {service.highlight}
                    </p>
                  </div>
                </div>
                <div
                  data-testid={`services-showcase-card-${slug}-deliverables`}
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
                    <TrackedCtaButton
                      href={service.href}
                      label={service.ctaLabel}
                      location={`services_showcase_${slug}`}
                      route="/services"
                      variant="secondary"
                      surfaceTone="dark"
                      dataTestId={`services-showcase-${slug}-button`}
                      className="w-full justify-between rounded-2xl border-nodo-lavender/35 bg-nodo-purple/88 px-4 py-3 text-left text-white shadow-[0_12px_32px_rgba(124,58,237,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-nodo-lavender/70 hover:bg-nodo-purple hover:text-white hover:shadow-[0_18px_42px_rgba(124,58,237,0.32)] group-hover:-translate-y-0.5 group-hover:border-nodo-lavender/70 group-hover:bg-nodo-purple group-hover:shadow-[0_18px_42px_rgba(124,58,237,0.32)] motion-reduce:transform-none motion-reduce:transition-none"
                      icon={
                        <span
                          aria-hidden="true"
                          className="flex size-7 items-center justify-center rounded-full bg-white/16 text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-white/24 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.22)] motion-reduce:transform-none motion-reduce:transition-none"
                        >
                          <ArrowRight className="size-4" />
                        </span>
                      }
                    >
                      {service.ctaLabel}
                    </TrackedCtaButton>
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
