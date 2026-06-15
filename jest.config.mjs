import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "!src/lib/content.ts",
    "!src/lib/contact-integrations.ts",
    "!src/lib/contact-server.ts",
    "!src/app/api/contact/route.ts",
    "!src/app/api/contact/upload/route.ts",
    "!src/components/atoms/ConstellationBackground.tsx",
    "!src/components/molecules/ContactForm.tsx",
    "!src/components/organisms/ContactSection.tsx",
    "!src/components/organisms/Header.tsx",
    "!src/components/organisms/Hero.tsx",
    "!src/components/organisms/PagePreloader.tsx",
    "!src/components/organisms/PlansGrid.tsx",
    "!src/components/organisms/ProcessSection.tsx",
    "!src/components/templates/CaseStudiesPage.tsx",
    "!src/components/templates/ServicesPage.tsx",
    "!src/components/templates/WebsiteDesignAucklandPage.tsx",
    "!src/components/templates/WebsitePlansPage.tsx",
    "!src/**/*.d.ts",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/e2e/",
  ],
};

export default createJestConfig(config);
