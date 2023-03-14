import React from "react";

let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

export function Mermaid({ graphDefinition }: { graphDefinition: string }) {
  const [html, setHtml] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  React.useLayoutEffect(() => {
    if (graphDefinition)
      try {
        (window as any).mermaid.mermaidAPI.render(uuid(), graphDefinition, (svgCode: any) => setHtml(svgCode));
      } catch (e) {
        setHtml("");
        console.error(e);
        setHasError(true);
      }
  }, [graphDefinition]);

  if (hasError) return <code className={"mermaid"}>{graphDefinition}</code>;

  return graphDefinition ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
}
