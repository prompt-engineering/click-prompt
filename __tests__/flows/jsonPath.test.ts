import { jsonPath } from "@/flows/flow-functions/jsonPath";
import "@testing-library/jest-dom";

describe("Json Parse for function", () => {
  it("parse", () => {
    const cities = [
      { name: "London", population: 8615246 },
      { name: "Berlin", population: 3517424 },
      { name: "Madrid", population: 3165235 },
      { name: "Rome", population: 2870528 },
    ];

    const names = jsonPath(cities, "$..name", ["name"]);
    expect(names.length).toEqual(4);
    expect(names[0]).toEqual({ name: "London" });
  });

  it("match name and population", () => {
    const cities = [
      { name: "London", population: 8615246 },
      { name: "Berlin", population: 3517424 },
      { name: "Madrid", population: 3165235 },
      { name: "Rome", population: 2870528 },
    ];

    const result = jsonPath(cities, "$..[name,population]", ["name", "population"]);
    expect(result.length).toEqual(4);
    expect(result[0]).toEqual({ name: "London", population: 8615246 });
  });
});
