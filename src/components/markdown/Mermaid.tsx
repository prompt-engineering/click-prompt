"use client";

import "client-only";
import React, { useCallback, useEffect, useRef, useState } from "react";
import svgPanZoom from "svg-pan-zoom";
import { Button, Flex } from "@chakra-ui/react";
import mermaid from "mermaid";

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

export default function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const [instance, setInstance] = useState<SvgPanZoom.Instance | null>(null);
  const enableZoom = useCallback(() => {
    instance?.enablePan();
    instance?.enableZoom();
  }, [instance]);

  const disableZoom = useCallback(() => {
    instance?.disablePan();
    instance?.disableZoom();
  }, [instance]);

  const resetZoom = useCallback(() => {
    instance?.fit();
    instance?.center();
  }, [instance]);

  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = React.useState(false);
  const currentId = uuid();

  const downloadSVG = useCallback(() => {
    const svg = ref.current!.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, `myimage.svg`);
  }, []);

  useEffect(() => {
    if (!ref.current || !graphDefinition) return;
    mermaid.initialize({
      startOnLoad: false,
    });

    mermaid.mermaidAPI
      .render(currentId, graphDefinition)
      .then(({ svg, bindFunctions }) => {
        ref.current!.innerHTML = svg;
        bindFunctions?.(ref.current!);

        setInstance(() => {
          const instance = svgPanZoom(ref.current!.querySelector("svg")!);
          instance.fit();
          instance.center();
          instance.disablePan();
          instance.disableZoom();
          return instance;
        });
      })
      .catch((e) => {
        console.info(e);

        // NOTE(CGQAQ): there's a bug in mermaid will always throw an error:
        //  Error: Diagram error not found.
        // we need to check if the svg is rendered.
        // if rendered, we can ignore the error.
        // ref: https://github.com/mermaid-js/mermaid/issues/4140
        if (ref.current?.querySelector("svg") == null) {
          setHasError(true);
        }
      });
  }, [graphDefinition]);

  useEffect(() => {
    const handleSpaceDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        enableZoom();
      }
    };

    const handleSpaceUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        disableZoom();
      }
    };
    document.addEventListener("keydown", handleSpaceDown);
    document.addEventListener("keyup", handleSpaceUp);

    return () => {
      document.removeEventListener("keydown", handleSpaceDown);
      document.removeEventListener("keyup", handleSpaceUp);
    };
  }, [enableZoom, disableZoom]);

  if (hasError || !graphDefinition) return <code className={"mermaid"}>{graphDefinition}</code>;
  return (
    <>
      <Flex justifyContent='flex-end' className='text-gray-400 font-bold'>
        * hold space to pan & zoom
      </Flex>
      <div
        ref={ref}
        onPointerDown={(event) => {
          ref.current?.querySelector("svg")?.setPointerCapture(event.pointerId);
        }}
      ></div>
      <Flex gap={2}>
        <Button onClick={resetZoom}>Reset Pan&Zoom</Button>
        <Button onClick={downloadSVG}>Download SVG</Button>
      </Flex>
    </>
  );
}
