import "@testing-library/jest-dom";
import { parseConfigures } from "@/flows/components/SettingHeaderConfig";

describe("Flow Authorization", () => {
  it("parse", () => {
    expect(
      parseConfigures([
        {
          key: "Authorization",
          value: " $${{ GITHUB_TOKEN }}",
        },
      ]),
    ).toEqual([{ key: "Authorization", value: "${{ GITHUB_TOKEN }}" }]);
    expect(
      parseConfigures([
        {
          key: "Authorization",
          value: "{{ GITHUB_TOKEN }}",
        },
      ]),
    ).toEqual([]);
  });

  it("parse two values", () => {
    expect(
      parseConfigures([
        {
          key: "Accept",
          value: "application/vnd.github+json",
        },
        {
          key: "Authorization",
          value: " $${{ GITHUB_TOKEN }}",
        },
      ]),
    ).toEqual([{ key: "Authorization", value: "${{ GITHUB_TOKEN }}" }]);
  });
});
