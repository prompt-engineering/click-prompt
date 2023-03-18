import "@testing-library/jest-dom";
import { explainParser, graphToFlow } from "@/data-processor/explain-parser";

describe("StableDiffusion Prompt Parser", () => {
  it("parse", () => {
    let str = `
digraph G {
  1[flowType = "prompt"]
  2[flowType = "prompt,interactive"]
  3[flowType = "prompt,interactive"]
  4[flowType = "prompt,interactive"]
  5[flowType = "prompt,interactive"]
  1 -> 2 -> 3
  2 -> 4
  2 -> 5
}`;
    let graph = explainParser(str);
    expect(graph.nodes().length).toEqual(5);
    expect(graph.edges().length).toEqual(3);
  });

  it("graphToFlow", () => {
    let str = `
digraph G {
  1[flowType = "prompt"]
  2[flowType = "prompt,interactive"]
  3[flowType = "prompt,interactive"]
  4[flowType = "prompt,interactive"]
  5[flowType = "prompt,interactive"]
  1 -> 2 -> 3
  2 -> 4
  2 -> 5
}`;
    let graph = explainParser(str);
    let flows = graphToFlow(graph);

    expect(flows.nodes.length).toEqual(5);

    expect(flows.nodes[0].height).toEqual(50);
    expect(flows.nodes[0].width).toEqual(120);
    expect(flows.nodes[0].position.x).toEqual(60);
    expect(flows.nodes[0].position.y).toEqual(75);
    expect(flows.nodes[0].data).toEqual({ flowType: "prompt" });

    expect(flows.edges.length).toEqual(3);
  });
});
