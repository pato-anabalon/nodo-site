import { axe, toHaveNoViolations } from "jest-axe";
import type { RenderResult } from "@testing-library/react";

expect.extend(toHaveNoViolations);

export async function expectNoA11yViolations({ container }: RenderResult) {
  expect(await axe(container)).toHaveNoViolations();
}
