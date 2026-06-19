import { ConstellationBackground } from '@/components/atoms/ConstellationBackground';
import type { AboutValue } from '@/lib/content';
import { testIdSlug } from '@/lib/utils';

type AboutValueSignalCardProps = {
  index: number;
  total: number;
  value: AboutValue;
};

export function AboutValueSignalCard({ index, total, value }: AboutValueSignalCardProps) {
  const Icon = value.icon;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      data-testid={`about-value-${testIdSlug(value.name)}`}
      className="about-value-signal-item relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 lg:absolute lg:inset-0 lg:flex lg:items-center lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 right-0 overflow-hidden lg:hidden">
        <ConstellationBackground
          className="opacity-28"
          density={0.28 + index * 0.025}
          fps={12}
          interactive={false}
          maxDevicePixelRatio={1}
          maxNodes={14 + index}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,24,0.08),rgba(124,58,237,0.1))]" />
      </div>

      <div className="about-value-signal-backdrop pointer-events-none absolute -inset-y-16 right-[-12%] hidden w-[72%] skew-x-[-8deg] overflow-hidden border-l border-nodo-purple/20 bg-[linear-gradient(135deg,rgba(124,58,237,0.2),rgba(232,48,207,0.06)_45%,transparent_72%)] lg:block">
        <ConstellationBackground
          className="opacity-46"
          density={0.42}
          fps={18}
          interactive={false}
          maxDevicePixelRatio={1}
          maxNodes={24}
        />
      </div>

      <div className="relative z-10 flex min-h-36 max-w-3xl flex-col pr-16 lg:min-h-0 lg:pr-0">
        <h3 className="about-value-signal-title text-balance text-4xl font-black leading-[0.9] tracking-normal text-white lg:order-2 lg:mt-10 lg:text-8xl">
          {value.name}
        </h3>
        <p className="about-value-signal-copy mt-3 max-w-[88%] text-sm leading-6 text-white/64 lg:order-3 lg:mt-6 lg:max-w-2xl lg:text-xl lg:leading-9">
          {value.description}
        </p>
        <div className="lg:order-1 lg:flex lg:items-center lg:gap-5">
          <span className="about-value-signal-icon absolute -bottom-10 -right-11 inline-flex size-28 items-center justify-center rounded-full border border-nodo-lavender/35 bg-nodo-purple/18 text-nodo-lavender shadow-[0_0_22px_rgba(124,58,237,0.72),0_0_70px_rgba(232,48,207,0.28)] lg:static lg:size-24 lg:shrink-0 lg:shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <Icon aria-hidden="true" className="size-12 lg:size-10" />
          </span>
          <span className="about-value-signal-number hidden text-sm font-black tracking-[0.24em] text-white/42 lg:inline">
            {number} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </article>
  );
}
