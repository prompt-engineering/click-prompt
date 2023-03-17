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
});
