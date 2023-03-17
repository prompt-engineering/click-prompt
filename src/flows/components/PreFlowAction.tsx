import React from "react";
import { ActionPostComponent, FlowAction } from "@/flows/types/flow-action";
import { preActionDispatcher } from "../pre-action-dispatcher";
import SharedFlowAction from "./SharedFlowAction";
import { JsonViewer } from "@/flows/flow-components/JsonViewer";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  const [isShowPostComponent, setIsShowPostComponent] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const handleSubmit = (modifiedAction: FlowAction) => {
    preActionDispatcher(modifiedAction).then((r) => {
      if (r.success) {
        setResult(r.result);
        if (action.postComponents?.length) {
          setIsShowPostComponent(true);
        }
      }
    });
  };

  function showPostComp(components: ActionPostComponent[], result: any) {
    return (
      <div>
        {components.map((component, index) => {
          switch (component.name) {
            case "JsonViewer":
              return <JsonViewer key={index} json={result} />;
            default:
              return <div key={index}>Not found</div>;
          }
        })}
      </div>
    );
  }

  return (
    <>
      <SharedFlowAction action={action} onSubmit={handleSubmit} />
      {isShowPostComponent &&
        action.postComponents?.length &&
        action.postComponents?.length > 0 &&
        showPostComp(action.postComponents, result)}
    </>
  );
}

export default PreFlowAction;
