import React, { useCallback, useState } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, EdgeChange, NodeChange } from "reactflow";
import "reactflow/dist/style.css";
import { Node, Edge } from "@reactflow/core/dist/esm/types";
import InteractiveNode from "@/components/FlowExplain/InteractiveNode";
import { explainParser, graphToFlow } from "@/data-processor/explain-parser";

type StepExplainProps = {
  content: string;
};

function StepExplain(props: StepExplainProps) {
  let graph = explainParser(props.content);
  let flowGraph = graphToFlow(graph);

  const initialNodes: Node[] = flowGraph.nodes.map((node) => {
    return {
      id: node.id,
      data: { label: node.label },
      position: node.position,
      type: "interactiveNode",
    };
  });

  const initialEdges: Edge[] = flowGraph.edges.map((edge) => {
    return { id: edge.id, source: edge.source, target: edge.target, type: "step" };
  });

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const nodeTypes = { interactiveNode: InteractiveNode };

  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) =>
  //     setNodes((nds) => {
  //       return applyNodeChanges(changes, nds);
  //     }),
  //   [],
  // );
  //
  // const onEdgesChange = useCallback((changes: EdgeChange[]) => {
  //   setEdges((eds: Edge[]) => {
  //     return applyEdgeChanges(changes, eds);
  //   });
  // }, []);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        // onNodesChange={onNodesChange}
        edges={edges}
        // onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default StepExplain;
