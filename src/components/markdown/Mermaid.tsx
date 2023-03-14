import "client-only";
import React, { useEffect, useRef } from "react";
import svgPanZoom from "svg-pan-zoom";

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

export function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = React.useState(false);
  const currentId = uuid();

  useEffect(() => {
    if (!graphDefinition) {
      return;
    }

    try {
      (window as any).mermaid.mermaidAPI.render(currentId, graphDefinition, (svgCode: string) => {
        ref.current!.innerHTML = svgCode;
      });
      const it = document.getElementById(currentId);
      // console.log("it", typeof it);
      // eslint-disable-next-line  @typescript-eslint/no-extra-non-null-assertion
      const instance = svgPanZoom(it!!);

      return () => instance.destroy();
    } catch (e) {
      console.info(e);
      setHasError(true);
    }
  }, [graphDefinition]);

  if (hasError) return <code className={"mermaid"}>{graphDefinition}</code>;

  return <div ref={ref}> </div>;
}
