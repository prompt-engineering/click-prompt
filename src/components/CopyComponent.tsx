import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";

function CopyComponent<TValue>(value: any) {
  return (
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
  );
}

export default CopyComponent;
