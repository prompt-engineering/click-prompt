import React from "react";

import { ActionPostComponent } from "@/flows/types/flow-action";
import { JsonViewer } from "@/flows/flow-components/JsonViewer";

export function PostComponentDispatcher(components: ActionPostComponent[], result: any) {
  return (
    <>
      {components.map((component, index) => {
        switch (component.name) {
          case "JsonViewer":
            return <JsonViewer key={index} json={result} />;
          default:
            return <div key={index}>Not found</div>;
        }
      })}
    </>
  );
}
