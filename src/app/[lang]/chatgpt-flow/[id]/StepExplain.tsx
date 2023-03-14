import React, { useCallback, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  EdgeChange,
  NodeChange,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Node, Edge } from "@reactflow/core/dist/esm/types";
import InteractiveNode from "@/components/FlowExplain/InteractiveNode";

type StepExplainProps = {
  json: string;
};

function StepExplain(props: StepExplainProps) {
  const initialNodes: Node[] = [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 50, y: 100 },
      targetPosition: Position.Right,
    },
    {
      id: "2",
      type: "interactiveNode",
      data: { label: "World" },
      targetPosition: Position.Left,
      position: { x: 300, y: 100 },
    },
  ];

  const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2", label: "to the", type: "step" }];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const nodeTypes = { interactiveNode: InteractiveNode };

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
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default StepExplain;
