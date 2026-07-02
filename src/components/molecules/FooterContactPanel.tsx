import { Facebook, Instagram, Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react';
import { contactEmail, contactPhone, socialLinks, type SocialPlatform } from '@/lib/seo';
import { cn } from '@/lib/utils';

const socialIcons: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin
};

function contactPhoneHref() {
  return `tel:${contactPhone.replace(/\s+/g, '')}`;
}

function iconButtonClass(isActive = true) {
  return cn(
    'group/social relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.055] text-white/62 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition duration-300',
    "before:absolute before:inset-0 before:scale-0 before:rounded-full before:bg-nodo-purple before:opacity-0 before:transition before:duration-300 before:content-['']",
    'hover:-translate-y-1 hover:rotate-3 hover:scale-110 hover:border-nodo-lavender/60 hover:text-white hover:shadow-[0_16px_34px_rgba(124,58,237,0.32)] hover:before:scale-100 hover:before:opacity-100',
    isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-42 hover:opacity-70'
  );
}

export function FooterContactPanel() {
  return (
    <div data-testid="site-footer-contact-panel" className="lg:px-2">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-nodo-lavender">Contact</p>
      <div className="mt-6 grid gap-4">
        <a
          href={`mailto:${contactEmail}`}
          data-testid="site-footer-contact-email"
          className="group/contact grid grid-cols-[2.75rem_1fr] items-center gap-3 text-left"
        >
          <span className={iconButtonClass()}>
            <Mail
              className="relative z-10 size-4 transition duration-300 group-hover/social:-rotate-12 group-hover/social:scale-110"
              aria-hidden="true"
            />
          </span>
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/34">Email</span>
            <span className="mt-1 block text-sm font-semibold text-white/66 transition group-hover/contact:text-white">
              {contactEmail}
            </span>
          </span>
        </a>
        <a
          href={contactPhoneHref()}
          data-testid="site-footer-contact-phone"
          className="group/contact grid grid-cols-[2.75rem_1fr] items-center gap-3 text-left"
        >
          <span className={iconButtonClass()}>
            <Phone
              className="relative z-10 size-4 transition duration-300 group-hover/social:-rotate-12 group-hover/social:scale-110"
              aria-hidden="true"
            />
          </span>
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/34">Phone</span>
            <span className="mt-1 block text-sm font-semibold text-white/66 transition group-hover/contact:text-white">
              {contactPhone}
            </span>
          </span>
        </a>
      </div>
      <div data-testid="site-footer-social-links" className="mt-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/34">Social</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.platform];

            if (!link.href) {
              return (
                <span
                  key={link.platform}
                  aria-label={`${link.label} coming soon`}
                  aria-disabled="true"
                  data-testid={`site-footer-social-${link.platform}`}
                  className={iconButtonClass(false)}
                  title={`${link.label} coming soon`}
                >
                  <Icon
                    className="relative z-10 size-4 transition duration-300 group-hover/social:-rotate-12 group-hover/social:scale-110"
                    aria-hidden="true"
                  />
                </span>
              );
            }

            return (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                data-testid={`site-footer-social-${link.platform}`}
                className={iconButtonClass()}
              >
                <Icon
                  className="relative z-10 size-4 transition duration-300 group-hover/social:-rotate-12 group-hover/social:scale-110"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
