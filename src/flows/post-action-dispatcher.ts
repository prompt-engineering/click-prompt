import { ActionResult, FlowAction } from "@/flows/types/flow-action";
import { apiProxy } from "@/flows/actions/api-action";
import { openAction } from "@/flows/actions/open-action";

export async function postActionDispatcher(action: FlowAction, content: string): Promise<ActionResult> {
  switch (action.type) {
    case "api":
      if (action.api) await apiProxy(action.api!, content);
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
