import "@testing-library/jest-dom";
import { jsonPath } from "@/data-processor/flow-functions/jsonPath";

describe("Json Parse for function", () => {
  it("parse", () => {
    const cities = [
      { name: "London", population: 8615246 },
      { name: "Berlin", population: 3517424 },
      { name: "Madrid", population: 3165235 },
      { name: "Rome", population: 2870528 },
    ];

    const names = jsonPath(cities, "$..name");
    expect(names.length).toEqual(4);
  });
});
