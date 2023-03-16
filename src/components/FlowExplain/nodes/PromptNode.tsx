import styled from "@emotion/styled";
import React from "react";
import { Handle, Position } from "reactflow";

type TextNodeProps = {
  isConnectable: boolean;
  data: { label: string };
};

function PromptNode(props: TextNodeProps) {
  const { isConnectable } = props;

  return (
    <TextNodeStyle>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <CardTitle>Prompt</CardTitle>
      <Title>{props.data.label}</Title>
      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const TextNodeStyle = styled.div`
  min-height: 50px;
  width: 120px;
  border: 1px solid #555;
  border-radius: 5px;
  background: white;
  font-family: jetbrains-mono, "JetBrains Mono", monospace;
`;

const CardTitle = styled.div`
  display: block;
  height: 20px;
  // 120px - 1px * 2;
  width: 118px;
  background: #eee;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #555555;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
`;

const Title = styled.div`
  padding: 0 2px;
  border-color: #eee;
  display: block;
  width: 120px;
  overflow-y: auto;
  font-size: 12px;
  text-align: center;
`;

export default PromptNode;
