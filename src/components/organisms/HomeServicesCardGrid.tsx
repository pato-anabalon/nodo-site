"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { createCardOnceReveal } from "@/lib/gsap-card-once-reveal";
import { createCardScrubReveal } from "@/lib/gsap-card-reveal";
import { services } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeServicesCardGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;

      if (!grid) {
        return;
      }

      const scrubReveal = createCardScrubReveal({
        container: grid,
        itemSelector: ".home-service-card-scrub",
      });
      const mobileReveal = createCardOnceReveal({
        container: grid,
        itemSelector: ".home-service-card-scrub",
        mediaQuery: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        onceStart: "top 86%",
      });

      return () => {
        scrubReveal.revert();
        mobileReveal.revert();
      };
    },
    { scope: gridRef },
  );

  return (
    <div
      ref={gridRef}
      data-testid="home-services-card-grid"
      className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {services.map((service, index) => (
        <div key={service.title} className="home-service-card-scrub h-full will-change-transform">
          <ServiceCard service={service} index={index} />
        </div>
      ))}
    </div>
  );
}
