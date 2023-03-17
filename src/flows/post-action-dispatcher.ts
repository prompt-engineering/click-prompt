import { ActionResult, FlowAction, OpenAction } from "@/flows/types/flow-action";
import { postApiAction } from "@/flows/api-actions";

async function openAction(openAction: OpenAction) {
  window.open(openAction.scheme);
  return {
    success: true,
  };
}

export async function postActionDispatcher(action: FlowAction, content: string): Promise<ActionResult> {
  switch (action.type) {
    case "api":
      if (action.api) await postApiAction(action.api!, content);
      break;
    case "open":
      if (action.open) await openAction(action.open!);
      break;
    default:
      console.log("Unknown actions type");
  }

  return {
    success: false,
    error: "Unknown actions type",
  };
}
