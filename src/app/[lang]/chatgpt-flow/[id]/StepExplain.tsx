import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { Edge, Node } from "@reactflow/core/dist/esm/types";
import "reactflow/dist/style.css";

import InteractiveNode from "@/components/FlowExplain/InteractiveNode";
import { explainParser, graphToFlow } from "@/data-processor/explain-parser";
import { StartlingStep } from "@/app/[lang]/chatgpt-flow/[id]/startling.type";

type StepExplainProps = {
  step: StartlingStep;
};

function StepExplain(props: StepExplainProps) {
  let graph = explainParser(props.step.explain || "");
  let flowGraph = graphToFlow(graph);

  function getLabel(node: {
    id: string;
    label: string | undefined;
    width: number;
    height: number;
    position: { x: number; y: number };
  }) {
    const id = parseInt(node.id) || 0;
    return props.step.steps[id]?.name || "";
  }

  const initialNodes: Node[] = flowGraph.nodes.map((node) => {
    return {
      id: node.id,
      data: { label: getLabel(node) },
      position: node.position,
      type: "interactiveNode",
    };
  });

  const initialEdges: Edge[] = flowGraph.edges.map((edge) => {
    return { id: edge.id, source: edge.source, target: edge.target, type: "step" };
  });

  const nodeTypes = { interactiveNode: InteractiveNode };

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow fitView={true} nodes={initialNodes} nodeTypes={nodeTypes} edges={initialEdges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default StepExplain;
