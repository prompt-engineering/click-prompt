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
      <StyledLabel>{props.data.label}</StyledLabel>
      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const TextNodeStyle = styled.div`
  height: 50px;
  width: 120px;
  border: 2px solid #eee;
  padding: 4px;
  border-radius: 5px;
  background: white;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 12px;
`;

export default InteractiveNode;
