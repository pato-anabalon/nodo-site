'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CheckCircle2 } from 'lucide-react';
import { ConstellationBackground } from '@/components/atoms/ConstellationBackground';
import { Container } from '@/components/atoms/Container';
import { MetaChip } from '@/components/atoms/MetaChip';
import { ScrollReveal } from '@/components/atoms/ScrollReveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { TrackedPlanCta } from '@/components/molecules/TrackedPlanCta';
import {
  brandingPlans,
  bundlePlans,
  marketingBrandingPageContent,
  marketingPlans,
  plansPageContent,
  type CommercialPlan
} from '@/lib/content';
import { cn, testIdSlug } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

const marketingHeroTitleWords = marketingBrandingPageContent.hero.title.split(' ');
const heroChipAccents = ['purple', 'lavender', 'pink'] as const;

function contactHref(plan: CommercialPlan['slug'], source: string) {
  return `/contact?plan=${plan}&intent=quote&source=${source}`;
}

function CommercialPlanCard({
  plan,
  source,
  light = false
}: {
  plan: CommercialPlan;
  source: string;
  light?: boolean;
}) {
  const topTag =
    plan.category === 'Marketing' ? 'Digital Marketing' : plan.category === 'Bundle' ? plan.model : plan.category;
  const showSecondaryTag = plan.category === 'Branding';

  return (
    <article
      data-testid={`${source}-${plan.slug}-card`}
      className={cn(
        'group relative flex h-full flex-col overflow-visible rounded-[2rem] border p-6 pt-10 transition duration-300 hover:-translate-y-1 hover:border-nodo-lavender/50 sm:p-7 sm:pt-11',
        light
          ? 'border-black/8 bg-[linear-gradient(145deg,#fbf9ff_0%,#ffffff_48%,#f8f4ff_100%)] text-nodo-black shadow-[0_24px_80px_rgba(0,0,0,0.10)] hover:bg-white'
          : 'border-white/12 bg-white/[0.045] text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] hover:bg-white/[0.07]',
        plan.highlighted && !light
          ? 'border-nodo-lavender/65 bg-[linear-gradient(160deg,rgba(124,58,237,0.34),rgba(255,255,255,0.08)_46%,rgba(5,5,5,0.7))]'
          : null,
        plan.highlighted && light
          ? 'border-nodo-purple/30 bg-[linear-gradient(145deg,#f3ecff_0%,#ffffff_50%,#f8f4ff_100%)]'
          : null
      )}
    >
      <div
        data-testid={`${source}-${plan.slug}-primary-tag`}
        className={cn(
          'absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-4 py-2 text-center text-xs font-black uppercase tracking-[0.16em] shadow-[0_14px_34px_rgba(0,0,0,0.22)]',
          light ? 'border-black/8 bg-nodo-black text-white' : 'border-white/14 bg-nodo-purple text-white',
          plan.highlighted &&
            (light
              ? 'border-nodo-purple/20 bg-nodo-lavender text-nodo-black'
              : 'border-white/20 bg-nodo-lavender text-nodo-black')
        )}
      >
        {topTag}
      </div>

      <div className="flex min-h-10 items-start justify-center">
        {showSecondaryTag ? (
          <span
            data-testid={`${source}-${plan.slug}-secondary-tag`}
            className={cn(
              'mt-1 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em]',
              light
                ? 'border-nodo-purple/20 bg-nodo-purple/10 text-nodo-purple'
                : 'border-white/14 bg-white/[0.06] text-white/66'
            )}
          >
            {plan.model}
          </span>
        ) : null}
      </div>

      <div className="mt-7">
        <h3
          data-testid={`${source}-${plan.slug}-title`}
          className={cn('text-3xl font-black tracking-normal', light ? 'text-nodo-black' : 'text-white')}
        >
          {plan.name}
        </h3>
        <p
          data-testid={`${source}-${plan.slug}-label`}
          className={cn('mt-3 min-h-14 text-sm leading-6', light ? 'text-nodo-ink/68' : 'text-white/62')}
        >
          {plan.label}
        </p>
      </div>

      <div className={cn('mt-7 border-y py-5', light ? 'border-black/8' : 'border-white/12')}>
        <p
          data-testid={`${source}-${plan.slug}-price`}
          className={cn('text-2xl font-black leading-tight', light ? 'text-nodo-black' : 'text-white')}
        >
          {plan.price}
        </p>
      </div>

      <p
        data-testid={`${source}-${plan.slug}-summary`}
        className={cn('mt-5 text-pretty text-sm leading-6', light ? 'text-nodo-ink/70' : 'text-white/68')}
      >
        {plan.summary}
      </p>

      <div className="mt-6 grid gap-3" data-testid={`${source}-${plan.slug}-features`}>
        {plan.includedFeatures.map((feature) => (
          <div
            key={feature}
            className={cn('flex gap-3 text-sm leading-5', light ? 'text-nodo-ink/74' : 'text-white/72')}
          >
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-nodo-lavender" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <TrackedPlanCta
          href={contactHref(plan.slug, source)}
          plan={plan.slug}
          intent="quote"
          location={source}
          dataTestId={`${source}-${plan.slug}-button`}
          variant={plan.highlighted ? 'primary' : 'secondary'}
          surfaceTone={light ? 'light' : 'dark'}
          className="w-full"
        >
          {plan.ctaLabel}
        </TrackedPlanCta>
      </div>
    </article>
  );
}

function PlanSection({
  id,
  eyebrow,
  title,
  description,
  plans,
  source,
  light = false
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  plans: CommercialPlan[];
  source: string;
  light?: boolean;
}) {
  return (
    <section
      id={id}
      data-testid={`${source}-section`}
      className={cn('py-20 sm:py-28', light && 'border-y border-black/8 bg-white text-nodo-black')}
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            className={cn(light && '[&_h2]:text-nodo-black [&_p]:text-nodo-ink/68')}
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid={`${source}-cards-grid`}>
          {plans.map((plan) => (
            <ScrollReveal key={plan.slug}>
              <CommercialPlanCard plan={plan} source={source} light={light} />
            </ScrollReveal>
          ))}
        </div>
        <p
          data-testid={`${source}-pricing-note`}
          className={cn('mt-5 text-sm', light ? 'text-nodo-ink/52' : 'text-white/46')}
        >
          {plansPageContent.pricingNote}
        </p>
      </Container>
    </section>
  );
}

export function MarketingBrandingPlansPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.marketing-hero-title-word', { yPercent: 135 });
        gsap.set('.marketing-hero-title', { autoAlpha: 1 });
        gsap.set(['.marketing-hero-kicker', '.marketing-hero-copy', '.marketing-hero-chip'], {
          autoAlpha: 0,
          y: 22
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('.marketing-hero-kicker', { autoAlpha: 1, y: 0, duration: 0.65 })
          .to('.marketing-hero-title-word', { yPercent: 0, duration: 0.9, stagger: 0.075 }, '-=0.18')
          .to('.marketing-hero-copy', { autoAlpha: 1, y: 0, duration: 0.72 }, '-=0.18')
          .to('.marketing-hero-chip', { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.07 }, '-=0.24');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.marketing-hero-kicker',
            '.marketing-hero-title',
            '.marketing-hero-title-word',
            '.marketing-hero-copy',
            '.marketing-hero-chip'
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0
          }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <main ref={root} data-testid="marketing-branding-plans-page-main" className="overflow-hidden bg-nodo-black">
      <section
        data-testid="marketing-branding-plans-hero-section"
        className="relative flex min-h-screen overflow-hidden bg-nodo-black pt-28"
      >
        <ConstellationBackground
          className="opacity-42"
          density={0.64}
          fps={36}
          interactive
          maxDevicePixelRatio={1.5}
          maxNodes={54}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_78%_26%,rgba(232,48,207,0.08),transparent_24%)]" />
        <Container className="relative z-10 flex items-center pb-16 pt-12">
          <div className="max-w-6xl" data-testid="marketing-branding-hero-content">
            <p
              data-testid="marketing-branding-hero-eyebrow"
              className="marketing-hero-kicker opacity-0 motion-reduce:opacity-100 mb-5 text-sm font-black uppercase tracking-[0.24em] text-nodo-lavender"
            >
              {marketingBrandingPageContent.hero.eyebrow}
            </p>
            <h1
              data-testid="marketing-branding-hero-title"
              className="marketing-hero-title opacity-0 motion-reduce:opacity-100 max-w-6xl text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl"
            >
              {marketingHeroTitleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mb-[-0.22em] inline-block overflow-hidden pb-[0.22em] align-top"
                >
                  <span className="marketing-hero-title-word inline-block pr-[0.22em]">{word}</span>
                </span>
              ))}
            </h1>
            <p
              data-testid="marketing-branding-hero-copy"
              className="marketing-hero-copy opacity-0 motion-reduce:opacity-100 mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/62"
            >
              {marketingBrandingPageContent.hero.copy}
            </p>
            <div data-testid="marketing-branding-hero-highlights" className="mt-8 flex flex-wrap gap-3">
              {marketingBrandingPageContent.hero.highlights.map((highlight, index) => (
                <MetaChip
                  key={highlight}
                  accent={heroChipAccents[index % heroChipAccents.length]}
                  className="marketing-hero-chip opacity-0 motion-reduce:opacity-100"
                  dataTestId={`marketing-branding-hero-highlight-${testIdSlug(highlight)}`}
                  tone="dark"
                >
                  {highlight}
                </MetaChip>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <PlanSection
        eyebrow={marketingBrandingPageContent.marketing.eyebrow}
        title={marketingBrandingPageContent.marketing.title}
        description={marketingBrandingPageContent.marketing.description}
        plans={marketingPlans}
        source="marketing-plans"
      />

      <PlanSection
        eyebrow={marketingBrandingPageContent.branding.eyebrow}
        title={marketingBrandingPageContent.branding.title}
        description={marketingBrandingPageContent.branding.description}
        plans={brandingPlans}
        source="branding-plans"
        light
      />

      <section id="bundles" data-testid="bundle-plans-section" className="py-20 sm:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow={marketingBrandingPageContent.bundles.eyebrow}
              title={marketingBrandingPageContent.bundles.title}
              description={marketingBrandingPageContent.bundles.description}
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="bundle-plans-cards-grid">
            {bundlePlans.map((plan) => (
              <ScrollReveal key={plan.slug}>
                <CommercialPlanCard plan={plan} source="bundle-plans" />
              </ScrollReveal>
            ))}
          </div>
          <p data-testid="bundle-plans-pricing-note" className="mt-5 max-w-5xl text-sm leading-6 text-white/46">
            {plansPageContent.pricingNote} {marketingBrandingPageContent.bundles.note}
          </p>
        </Container>
      </section>

      <section
        data-testid="marketing-branding-plans-final-cta-section"
        className="bg-nodo-purple py-20 text-white sm:py-28"
      >
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/70">
                  {marketingBrandingPageContent.finalCta.eyebrow}
                </p>
                <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-normal sm:text-6xl">
                  {marketingBrandingPageContent.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  {marketingBrandingPageContent.finalCta.copy}
                </p>
              </div>
              <TrackedPlanCta
                href="/contact?intent=discovery-call&source=marketing-branding-final"
                plan="not-selected"
                intent="discovery-call"
                location="marketing_branding_final"
                dataTestId="marketing-branding-final-button"
                variant="inverted"
              >
                Book a discovery call
              </TrackedPlanCta>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
