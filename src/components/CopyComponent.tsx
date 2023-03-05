import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";

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
          <CopyIcon boxSize={22} />
        </div>
      </CopyToClipboard>
    </div>
  );
}

export default CopyComponent;
