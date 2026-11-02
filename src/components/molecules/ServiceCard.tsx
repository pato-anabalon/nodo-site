'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { trackHomepageCtaClicked } from '@/lib/analytics';
import type { Service } from '@/lib/content';
import { testIdSlug } from '@/lib/utils';

type ServiceCardProps = {
  service: Pick<Service, 'eyebrow' | 'title' | 'description' | 'bestWhen' | 'ctaLabel' | 'href' | 'icon'>;
  index: number;
  href?: string;
};

export function ServiceCard({ service, index, href = service.href }: ServiceCardProps) {
  const Icon = service.icon;
  const slug = testIdSlug(service.title);

  return (
    <article
      data-testid={`home-service-card-${slug}`}
      className="group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-6 transition duration-300 focus-within:border-nodo-purple/55 hover:-translate-y-1 hover:border-nodo-purple/55 hover:bg-white/[0.08] hover:shadow-[0_18px_44px_rgba(124,58,237,0.18)]"
    >
      <p
        aria-hidden="true"
        data-testid={`home-service-card-${slug}-index`}
        className="pointer-events-none absolute -right-1 top-0 z-0 text-[5rem] font-black leading-none tracking-normal text-nodo-purple/[0.10] transition duration-300 group-hover:text-nodo-purple/[0.16]"
      >
        {String(index + 1).padStart(2, '0')}
      </p>
      <div
        data-testid={`home-service-card-${slug}-icon`}
        className="relative z-10 mb-12 inline-flex size-12 items-center justify-center rounded-2xl bg-nodo-purple text-white shadow-[0_0_32px_rgba(124,58,237,0.42)]"
      >
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <p
        data-testid={`home-service-card-${slug}-eyebrow`}
        className="relative z-10 text-xs font-semibold uppercase tracking-[0.24em] text-nodo-lavender/82"
      >
        {service.eyebrow}
      </p>
      <h3
        data-testid={`home-service-card-${slug}-title`}
        className="relative z-10 mt-4 text-2xl font-black tracking-normal text-white"
      >
        {service.title}
      </h3>
      <p
        data-testid={`home-service-card-${slug}-description`}
        className="relative z-10 mt-4 text-pretty text-base leading-7 text-white/64"
      >
        {service.description}
      </p>
      <p
        data-testid={`home-service-card-${slug}-best-when`}
        className="relative z-10 mt-4 text-pretty text-sm font-semibold leading-6 text-white/80"
      >
        {service.bestWhen}
      </p>
      <Link
        href={href}
        data-testid={`home-service-card-${slug}-link`}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-nodo-lavender transition duration-300 after:absolute after:inset-0 after:z-20 after:rounded-[1.75rem] group-hover:text-white focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-nodo-lavender"
        onClick={() => trackHomepageCtaClicked({ label: service.ctaLabel, location: 'home_services_card', href })}
      >
        {service.ctaLabel}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-nodo-purple transition duration-300 group-hover:scale-x-100" />
    </article>
  );
}
