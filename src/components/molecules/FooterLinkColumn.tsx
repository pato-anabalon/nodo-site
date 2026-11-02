import Link from 'next/link';
import { testIdSlug } from '@/lib/utils';

export type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  const columnSlug = testIdSlug(title);

  return (
    <div data-testid={`site-footer-column-${columnSlug}`}>
      <p
        data-testid={`site-footer-column-${columnSlug}-title`}
        className="text-xs font-black uppercase tracking-[0.22em] text-nodo-lavender"
      >
        {title}
      </p>
      <ul className="mt-3 grid sm:mt-5 sm:gap-3" data-testid={`site-footer-column-${columnSlug}-links`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              data-testid={`site-footer-link-${testIdSlug(`${title}-${link.label}`)}`}
              className="group inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white/58 sm:min-h-0 transition hover:text-white"
            >
              <span className="size-1.5 rounded-full bg-nodo-purple opacity-0 transition group-hover:opacity-100" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
