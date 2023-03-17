import React from "react";
import { FlowAction } from "@/flows/types/flow-action";
import { preActionDispatcher } from "../pre-action-dispatcher";
import SharedFlowAction from "./SharedFlowAction";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  const handleSubmit = (modifiedAction: FlowAction) => {
    preActionDispatcher(modifiedAction).then((r) => console.log(r));
  };

  return <SharedFlowAction action={action} onSubmit={handleSubmit} />;
}

export default PreFlowAction;
