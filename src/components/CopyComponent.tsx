import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";
import { Tooltip } from "@chakra-ui/react";

type CopyProps = {
  value: string;
  className?: string;
  children?: React.ReactNode;
};

function CopyComponent({ value, className = "", children }: CopyProps) {
  return (
    <div className={className}>
      <CopyToClipboard
        text={value}
        onCopy={() => {
          alert("Copied to clipboard");
        }}
      >
        <div className='cursor-pointer flex justify-center'>
          {children ? children : ""}
          <Tooltip label='复制到剪贴板' aria-label='A tooltip'>
            <CopyIcon boxSize={22} />
          </Tooltip>
        </div>
      </CopyToClipboard>
    </div>
  );
}

export default CopyComponent;
