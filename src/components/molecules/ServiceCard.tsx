import type { Service } from "@/lib/content";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group relative min-h-80 overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-6 transition duration-300 hover:-translate-y-1 hover:border-nodo-lavender/50 hover:bg-white/[0.08]">
      <div className="absolute right-5 top-5 text-sm font-black text-white/14">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="mb-12 inline-flex size-12 items-center justify-center rounded-2xl bg-nodo-purple text-white shadow-[0_0_32px_rgba(124,58,237,0.42)]">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <h3 className="text-2xl font-black tracking-normal text-white">{service.title}</h3>
      <p className="mt-4 text-pretty text-base leading-7 text-white/64">
        {service.description}
      </p>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-nodo-purple transition duration-300 group-hover:scale-x-100" />
    </article>
  );
}
