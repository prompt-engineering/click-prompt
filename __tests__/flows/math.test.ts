import "@testing-library/jest-dom";
import { math } from "@/flows/flow-functions/math";

describe("Math Evaluator", () => {
  it("simple eval", () => {
    expect(math("value + 1", 1)).toEqual(2);
  });

  it("with object", () => {
    const demoObject = {
      x: 123,
      y: 456,
    };

    expect(math("value.x + 3", demoObject, "x")).toEqual({
      x: 126,
      y: 456,
    });
  });

  it("with array", () => {
    const demoArray = [1, 2, 3, 4, 5];
    const result = math("value + 1", demoArray);
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });

  it("with object array", () => {
    const demoArray = [
      {
        x: 1,
        y: 2,
      },
      {
        x: 3,
        y: 4,
      },
    ];
    const result = math("value.x + 1", demoArray, "x");
    expect(result).toEqual([
      {
        x: 2,
        y: 2,
      },
      {
        x: 4,
        y: 4,
      },
    ]);
  });
});
