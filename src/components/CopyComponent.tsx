import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@chakra-ui/icons";
import React from "react";

function CopyComponent<TValue>(props: any) {
  return (
    <CopyToClipboard
      text={props.value}
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
