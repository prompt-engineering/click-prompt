import "client-only";
import React, { useCallback, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

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

export function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = React.useState(false);
  const currentId = uuid();

  const downloadSVG = useCallback(() => {
    const svg = ref.current!.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, `myimage.svg`);
  }, []);

  useEffect(() => {
    if (!graphDefinition) {
      return;
    }
    // FIXME anti-pattern, but works
    let instance: any;
    async function initSvg() {
      (window as any).mermaid.mermaidAPI.render(currentId, graphDefinition, (svgCode: string) => {
        ref.current!.innerHTML = svgCode;
      });
      const it = document.getElementById(currentId);
      if (!it) {
        return;
      }
      const { default: svgPanZoom } = await import("svg-pan-zoom");
      instance = svgPanZoom(it);
    }

    try {
      initSvg();
      return () => {
        console.log("instance?.destroy()", instance);
        return instance?.destroy();
      };
    } catch (e) {
      console.info(e);
      setHasError(true);
    }
  }, [graphDefinition]);

  if (hasError) return <code className={"mermaid"}>{graphDefinition}</code>;

  return (
    <>
      <div ref={ref}></div>
      <Button onClick={downloadSVG}>Download SVG</Button>
    </>
  );
}
