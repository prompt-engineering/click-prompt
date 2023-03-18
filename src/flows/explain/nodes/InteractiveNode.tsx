import styled from "@emotion/styled";
import React from "react";
import { Handle, Position } from "reactflow";

type TextNodeProps = {
  isConnectable: boolean;
  data: { label: string };
};

function InteractiveNode(props: TextNodeProps) {
  const { isConnectable } = props;

  return (
    <TextNodeStyle>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <Title>{props.data.label}</Title>
      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const TextNodeStyle = styled.div`
  font-family: jetbrains-mono, "JetBrains Mono", monospace;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;

  min-height: 50px;
  width: 120px;
  border: 2px solid #555;
  padding: 4px;
  border-radius: 5px;
  background: white;
`;

const Title = styled.div`
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
`;

export default InteractiveNode;
