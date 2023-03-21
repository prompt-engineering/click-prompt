import dynamic from "next/dynamic";
import React from "react";

export default function MermaidWrapper({ graphDefinition }: { graphDefinition: string }) {
  const MermaidDynamic = dynamic(() => import("./Mermaid"), { ssr: false });
  return <MermaidDynamic graphDefinition={graphDefinition} />;
}
