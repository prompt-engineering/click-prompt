import "client-only";
import React, { useCallback, useEffect, useRef } from "react";
import svgPanZoom from "svg-pan-zoom";
import { Button, Flex } from "@chakra-ui/react";

function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

export function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = React.useState(false);
  let currentId = "";

  const downloadSVG = () => {
    const svg = ref.current!.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, `myimage.svg`);
  };

  useEffect(() => {
    if (!graphDefinition) {
      return;
    }

    try {
      currentId = uuid();
      (window as any).mermaid.mermaidAPI.render(currentId, graphDefinition, (svgCode: string) => {
        ref.current!.innerHTML = svgCode;
      });
    } catch (e) {
      console.info(e);
      setHasError(true);
    }
  }, [graphDefinition]);

  if (hasError) return <code className={"mermaid"}>{graphDefinition}</code>;

  const makeZoom = () => {
    console.log(currentId);
    const currentElement = document.getElementById(currentId);
    if (!currentElement) return;

    const instance = svgPanZoom(currentElement);
    return () => instance.destroy();
  };

  return (
    <>
      <div ref={ref}></div>
      <Flex gap={4}>
        <Button onClick={makeZoom}>Enable Zoom</Button>
        <Button onClick={downloadSVG}>Download SVG</Button>
      </Flex>
    </>
  );
}
