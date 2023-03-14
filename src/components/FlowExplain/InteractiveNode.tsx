import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

type TextNodeProps = {
  isConnectable: boolean;
};

function InteractiveNode({ isConnectable }: TextNodeProps) {
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <TextNodeStyle>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <div>
        <StyledLabel htmlFor='text'>Text:</StyledLabel>
        <input id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const TextNodeStyle = styled.div`
  height: 50px;
  border: 1px solid #eee;
  padding: 5px;
  border-radius: 5px;
  background: white;
`;

const StyledLabel = styled.label`
  display: block;
  color: #777;
  font-size: 12px;
`;

export default InteractiveNode;
