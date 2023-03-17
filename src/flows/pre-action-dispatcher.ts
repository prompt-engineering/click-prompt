import { FlowAction } from "@/flows/types/flow-action";
import { apiProxy } from "@/flows/actions/api-action";

export async function preActionDispatcher(action: FlowAction) {
  console.log("preActionDispatcher", action);
  switch (action.type) {
    case "api":
      if (action.api) return await apiProxy(action.api!);
      break;
    default:
      console.log("Unknown actions type");
  }

  return {
    success: false,
    error: "Unknown actions type",
  };
}
