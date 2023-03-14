import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

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
        <StyledInput id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
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

const StyledInput = styled.input`
  width: 108px;
  height: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  color: #777;
  font-size: 12px;
`;

export default InteractiveNode;
