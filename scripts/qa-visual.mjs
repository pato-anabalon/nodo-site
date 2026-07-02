import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const DEFAULT_OUTPUT_DIR = '/private/tmp';
const DEFAULT_ROUTE = '/';
const VIEWPORTS = {
  desktop: { width: 1440, height: 1600 },
  mobile: { width: 390, height: 1200 }
};

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.PLAYWRIGHT_BASE_URL ?? DEFAULT_BASE_URL,
    outputDir: process.env.QA_VISUAL_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR,
    route: DEFAULT_ROUTE,
    name: '',
    viewport: 'all',
    focusTestId: '',
    scrollProgress: 0,
    waitMs: 0
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--route' && next) {
      args.route = next;
      index += 1;
      continue;
    }

    if (arg === '--name' && next) {
      args.name = next;
      index += 1;
      continue;
    }

    if (arg === '--base-url' && next) {
      args.baseUrl = next;
      index += 1;
      continue;
    }

    if (arg === '--output-dir' && next) {
      args.outputDir = next;
      index += 1;
      continue;
    }

    if (arg === '--viewport' && next) {
      args.viewport = next;
      index += 1;
      continue;
    }

    if (arg === '--focus-test-id' && next) {
      args.focusTestId = next;
      index += 1;
      continue;
    }

    if (arg === '--scroll-progress' && next) {
      args.scrollProgress = Number(next);
      index += 1;
      continue;
    }

    if (arg === '--wait-ms' && next) {
      args.waitMs = Number(next);
      index += 1;
      continue;
    }

    if (!arg.startsWith('--')) {
      args.route = arg;
    }
  }

  return args;
}

function routePath(route) {
  return route.startsWith('/') ? route : `/${route}`;
}

function fileSlug(value) {
  return (
    value
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'home'
  );
}

async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);

  for (let y = 0; y <= height; y += 700) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(150);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
}

async function focusPage(page, testId, progress) {
  const result = await page.evaluate(
    ({ targetTestId, targetProgress }) => {
      const target = document.querySelector(`[data-testid="${targetTestId}"]`);

      if (!(target instanceof HTMLElement)) {
        return null;
      }

      const scrollContainer = target.parentElement?.classList.contains('pin-spacer') ? target.parentElement : target;
      const top = scrollContainer.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(0, scrollContainer.offsetHeight - window.innerHeight);
      const scrollTop = top + range * targetProgress;

      window.scrollTo(0, scrollTop);
      return {
        containerHeight: scrollContainer.offsetHeight,
        range,
        scrollTop,
        targetHeight: target.offsetHeight
      };
    },
    {
      targetTestId: testId,
      targetProgress: Math.min(1, Math.max(0, progress))
    }
  );

  if (!result) {
    throw new Error(`Unable to find data-testid="${testId}".`);
  }

  await page.waitForTimeout(1500);
  console.log(
    `Focused ${testId} at ${Math.round(progress * 100)}% (${Math.round(result.scrollTop)}px / ${Math.round(result.range)}px range)`
  );
}

async function captureViewport({ browser, focusTestId, outputPath, scrollProgress, url, viewport, waitMs }) {
  const page = await browser.newPage({ viewport });

  await page.addInitScript(() => {
    sessionStorage.setItem('nodo:preloader-seen', 'true');
    localStorage.setItem('nodo:analytics-consent', 'declined');
    document.documentElement.dataset.nodoPreloaded = 'true';
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('load', { timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(500);
  await revealPage(page);

  if (focusTestId) {
    await focusPage(page, focusTestId, scrollProgress);
  }

  if (waitMs > 0) {
    await page.waitForTimeout(waitMs);
  }

  await page.screenshot({ path: outputPath, fullPage: !focusTestId });
  await page.close();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const route = routePath(args.route);
  const url = new URL(route, args.baseUrl).toString();
  const name = args.name || fileSlug(route);
  const selectedViewports = args.viewport === 'all' ? Object.keys(VIEWPORTS) : [args.viewport];

  for (const viewportName of selectedViewports) {
    if (!VIEWPORTS[viewportName]) {
      throw new Error(`Unknown viewport: ${viewportName}. Use desktop, mobile, or all.`);
    }
  }

  const browser = await chromium.launch({ headless: true });
  const outputPaths = [];

  try {
    await mkdir(args.outputDir, { recursive: true });

    for (const viewportName of selectedViewports) {
      const outputPath = `${args.outputDir}/nodo-${name}-${viewportName}.png`;
      await captureViewport({
        browser,
        focusTestId: args.focusTestId,
        outputPath,
        scrollProgress: args.scrollProgress,
        url,
        viewport: VIEWPORTS[viewportName],
        waitMs: args.waitMs
      });
      outputPaths.push(outputPath);
    }
  } finally {
    await browser.close();
  }

  console.log(`Captured ${url}`);
  for (const outputPath of outputPaths) {
    console.log(outputPath);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
