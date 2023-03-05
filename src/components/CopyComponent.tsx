import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";
import { Tooltip, useToast } from "@chakra-ui/react";

type CopyProps = {
  value: string;
  className?: string;
  children?: React.ReactNode;
};

function CopyComponent({ value, className = "", children }: CopyProps) {
  const toast = useToast();
  return (
    <div className={className}>
      <CopyToClipboard
        text={value}
        onCopy={() => {
          toast({
            title: "Copied to clipboard",
            position: "top",
            status: "success",
          });
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
