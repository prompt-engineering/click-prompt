import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";

function CopyComponent({
  value,
  className,
}: {
  value: string;
  className: string;
}) {
  return (
    <div className={className}>
      <CopyToClipboard
        text={value}
        onCopy={() => {
          alert("Copied to clipboard");
        }}
      >
        <div className='cursor-pointer flex justify-center'>
          <CopyIcon boxSize={22} />
        </div>
      </CopyToClipboard>
    </div>
  );
}

export default CopyComponent;
