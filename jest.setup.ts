import "@testing-library/jest-dom";
import { ReadableStream, TransformStream, WritableStream } from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";
import * as React from "react";

const mockReact = React;

Object.assign(globalThis, {
  ReadableStream,
  TextDecoder,
  TextEncoder,
  TransformStream,
  WritableStream,
});

// `undici` reads TextEncoder during module initialization, so it must be loaded after the polyfill above.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const undici = require("undici") as typeof import("undici");

Object.assign(globalThis, {
  fetch: globalThis.fetch ?? undici.fetch,
  Headers: globalThis.Headers ?? undici.Headers,
  Request: globalThis.Request ?? undici.Request,
  Response: globalThis.Response ?? undici.Response,
});

const createMatchMedia = (matches = false) => (query: string) => ({
  matches,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: createMatchMedia(false),
});

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: jest.fn(() => 1),
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: jest.fn(),
});

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  addColorStop: jest.fn(),
  arc: jest.fn(),
  beginPath: jest.fn(),
  clearRect: jest.fn(),
  closePath: jest.fn(),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  fill: jest.fn(),
  fillRect: jest.fn(),
  lineTo: jest.fn(),
  moveTo: jest.fn(),
  restore: jest.fn(),
  rotate: jest.fn(),
  save: jest.fn(),
  scale: jest.fn(),
  setTransform: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
}));

Element.prototype.getBoundingClientRect = jest.fn(() => ({
  bottom: 100,
  height: 100,
  left: 0,
  right: 100,
  top: 0,
  width: 100,
  x: 0,
  y: 0,
  toJSON: () => ({}),
}));

jest.mock("@vercel/analytics", () => ({
  track: jest.fn(),
}));

jest.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("@upstash/redis", () => ({
  Redis: jest.fn().mockImplementation(() => ({
    expire: jest.fn(),
    get: jest.fn(),
    incr: jest.fn(),
    set: jest.fn(),
  })),
}));

jest.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void | (() => void)) => {
    mockReact.useEffect(() => callback(), [callback]);
  },
}));

const matchMediaMock = {
  add: jest.fn((_query, callback) => {
    callback({ conditions: { reduceMotion: false } });
  }),
  revert: jest.fn(),
};

jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    from: jest.fn(() => ({
      play: jest.fn().mockReturnThis(),
      restart: jest.fn().mockReturnThis(),
    })),
    fromTo: jest.fn(() => ({
      play: jest.fn().mockReturnThis(),
      restart: jest.fn().mockReturnThis(),
    })),
    killTweensOf: jest.fn(),
    matchMedia: jest.fn(() => matchMediaMock),
    registerPlugin: jest.fn(),
    set: jest.fn(),
    timeline: jest.fn(() => ({
      add: jest.fn().mockReturnThis(),
      call: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      to: jest.fn().mockReturnThis(),
      play: jest.fn().mockReturnThis(),
      reverse: jest.fn().mockReturnThis(),
    })),
    to: jest.fn(() => ({
      play: jest.fn().mockReturnThis(),
      restart: jest.fn().mockReturnThis(),
      reverse: jest.fn().mockReturnThis(),
    })),
    utils: {
      toArray: jest.fn(() => []),
    },
  },
}));

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    batch: jest.fn(),
    create: jest.fn((options) => {
      options?.onEnter?.();
      return { kill: jest.fn() };
    }),
  },
}));
