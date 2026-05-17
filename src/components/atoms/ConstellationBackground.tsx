"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ConstellationBackgroundProps = {
  backgroundTone?: "dark" | "light";
  className?: string;
  density?: number;
  fps?: number;
  interactive?: boolean;
  maxDevicePixelRatio?: number;
  maxNodes?: number;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  accent: boolean;
};

const colors = {
  white: "255, 255, 255",
  purple: "124, 58, 237",
  lavender: "196, 181, 253",
  ink: "12, 10, 18",
  charcoal: "18, 16, 24",
};

const colorSchemes = {
  dark: {
    node: colors.white,
    accentNode: colors.purple,
    line: colors.white,
    accentLine: colors.lavender,
    glow: colors.purple,
  },
  light: {
    node: colors.charcoal,
    accentNode: colors.purple,
    line: colors.charcoal,
    accentLine: colors.purple,
    glow: colors.purple,
  },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createNodes(width: number, height: number, density: number, maxNodes: number) {
  const safeDensity = clamp(density, 0.2, 1);
  const minNodes = Math.round(34 * safeDensity);
  const count = clamp(Math.round((width * height * safeDensity) / 17000), minNodes, maxNodes);

  return Array.from({ length: count }, (_, index): Node => {
    const accent = index % 11 === 0;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (accent ? 0.12 : 0.22),
      vy: (Math.random() - 0.5) * (accent ? 0.12 : 0.22),
      radius: accent ? Math.random() * 2.8 + 2.6 : Math.random() * 1.8 + 1.1,
      alpha: accent ? 0.86 : Math.random() * 0.32 + 0.38,
      phase: Math.random() * Math.PI * 2,
      accent,
    };
  });
}

export function ConstellationBackground({
  backgroundTone = "dark",
  className,
  density = 1,
  fps = 60,
  interactive = true,
  maxDevicePixelRatio = 2,
  maxNodes = 104,
}: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let animationFrame = 0;
    let lastDraw = 0;
    let isVisible = true;
    const frameInterval = 1000 / clamp(fps, 12, 60);
    const scheme = colorSchemes[backgroundTone];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height, density, maxNodes);
    };

    const draw = (timestamp = 0) => {
      if (!reducedMotion.matches && timestamp - lastDraw < frameInterval) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      lastDraw = timestamp;
      context.clearRect(0, 0, width, height);

      const connectionDistance = width < 700 ? 118 : 154;

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];

        if (!reducedMotion.matches) {
          node.x += node.vx;
          node.y += node.vy;
          node.phase += 0.012;

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }

        for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
          const next = nodes[nextIndex];
          const dx = node.x - next.x;
          const dy = node.y - next.y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            const strength = 1 - distance / connectionDistance;
            const pointerDistance = Math.min(
              Math.hypot((node.x + next.x) / 2 - pointer.x, (node.y + next.y) / 2 - pointer.y),
              240,
            );
            const pointerBoost = pointer.active ? (1 - pointerDistance / 240) * 0.56 : 0;

            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(next.x, next.y);
            const baseAlpha =
              backgroundTone === "light"
                ? strength * 1.28 + pointerBoost * 2.18
                : strength * 0.24 + pointerBoost;

            context.strokeStyle = `rgba(${node.accent || next.accent ? scheme.accentLine : scheme.line}, ${baseAlpha})`;
            context.lineWidth = node.accent || next.accent ? 1.35 : 0.8;
            context.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = reducedMotion.matches ? 0 : Math.sin(frame * 0.018 + node.phase) * 0.22;
        const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const pointerScale = pointer.active && pointerDistance < 180 ? 1.45 : 1;
        const radius = (node.radius + pulse) * pointerScale;

        context.beginPath();
        context.arc(node.x, node.y, Math.max(radius, 0.6), 0, Math.PI * 2);
        const nodeAlpha =
          backgroundTone === "light" && !node.accent
            ? Math.min(node.alpha + 0.58, 1)
            : node.alpha;

        context.fillStyle = `rgba(${node.accent ? scheme.accentNode : scheme.node}, ${nodeAlpha})`;
        context.fill();

        if (node.accent) {
          context.beginPath();
          context.arc(node.x, node.y, radius * 2.9, 0, Math.PI * 2);
          context.fillStyle = `rgba(${scheme.glow}, 0.12)`;
          context.fill();
        }
      }

      frame += 1;

      if (!reducedMotion.matches && isVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible && !reducedMotion.matches) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(draw);
      }
    });

    observer.observe(canvas);
    visibilityObserver.observe(canvas);

    if (interactive) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }

    resize();
    draw();

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();

      if (interactive) {
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
      }

      window.cancelAnimationFrame(animationFrame);
    };
  }, [backgroundTone, density, fps, interactive, maxDevicePixelRatio, maxNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 h-full w-full",
        interactive ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      aria-hidden="true"
    />
  );
}
