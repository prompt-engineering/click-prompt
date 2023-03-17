import "@testing-library/jest-dom";
import { fillStepWithValued } from "@/flows/types/flow-step";

describe("Step Valued", () => {
  it("fillStepWithValued", () => {
    let step = {
      name: "分析需求，编写用户故事",
      ask: "story: $$placeholder$$",
      cachedResponseRegex: "/.*/",
      values: {
        placeholder: "用户通过主菜单进入“权限管理”模块，选择“账号管理”Tab页，可以看到“新增账号”按钮。",
      },
    };
    let result = fillStepWithValued(step, {});
    expect(result.replaced).toEqual(true);
    expect(result.ask).toEqual(
      "story: 用户通过主菜单进入“权限管理”模块，选择“账号管理”Tab页，可以看到“新增账号”按钮。",
    );
  });

  it("fillStepWithValued with cached", () => {
    let step = {
      name: "分析需求，编写用户故事",
      ask: "story: $$response:1$$",
      cachedResponseRegex: "/.*/",
      values: {},
    };
    let result = fillStepWithValued(step, {
      1: "Cached Value",
    });
    expect(result.replaced).toEqual(true);
    expect(result.ask).toEqual("story: Cached Value");
  });
});
