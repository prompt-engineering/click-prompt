import "@testing-library/jest-dom";
import { math } from "@/flows/flow-functions/math";

describe("Math Evaluator", () => {
  it("simple eval", () => {
    expect(math(1, "value + 1")).toEqual(2);
  });
});
