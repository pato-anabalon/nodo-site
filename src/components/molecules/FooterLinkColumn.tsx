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
      <ul className="mt-5 grid gap-3" data-testid={`site-footer-column-${columnSlug}-links`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              data-testid={`site-footer-link-${testIdSlug(`${title}-${link.label}`)}`}
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white/58 transition hover:text-white"
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
