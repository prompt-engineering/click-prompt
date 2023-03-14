import React, { useCallback, useState } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, Controls, EdgeChange, NodeChange } from "reactflow";
import "reactflow/dist/style.css";

type StepExplainProps = {
  json: string;
};

function StepExplain(props: StepExplainProps) {
  const initialNodes = [
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

  const initialEdges = [{ id: "1-2", source: "1", target: "2", label: "to the", type: "step" }];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  // @ts-ignore
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

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
