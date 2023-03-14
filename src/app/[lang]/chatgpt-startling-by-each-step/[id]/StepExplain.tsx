import React, { useCallback, useState } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, EdgeChange, NodeChange } from "reactflow";
import "reactflow/dist/style.css";
import { Node, Edge } from "@reactflow/core/dist/esm/types";

type StepExplainProps = {
  json: string;
};

function StepExplain(props: StepExplainProps) {
  const initialNodes: Node[] = [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 100, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ];

  const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2", label: "to the", type: "step" }];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        return applyNodeChanges(changes, nds);
      }),
    [],
  );

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds: Edge[]) => {
      return applyEdgeChanges(changes, eds);
    });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} onNodesChange={onNodesChange} edges={edges} onEdgesChange={onEdgesChange}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default StepExplain;
