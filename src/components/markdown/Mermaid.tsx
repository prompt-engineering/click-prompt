import React from "react";
import svgPanZoom from "svg-pan-zoom";

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

export function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const [html, setHtml] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  let currentId = uuid();

  React.useLayoutEffect(() => {
    if (!graphDefinition) {
      return;
    }

    try {
      (window as any).mermaid.mermaidAPI.render(currentId, graphDefinition, (svgCode: any) => setHtml(svgCode));
    } catch (e) {
      setHtml("");
      // console.info(e);
      setHasError(true);
    }
  }, [graphDefinition]);

  if (hasError) return <code className={"mermaid"}>{graphDefinition}</code>;

  setTimeout(() => {
    document.getElementById(currentId)?.addEventListener("load", function () {
      svgPanZoom(document.getElementById(currentId)!!);
    });
  }, 100);

  return graphDefinition ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
}
