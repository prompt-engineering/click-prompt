import { FlowAction } from "@/flows/types/flow-action";

export async function preActionDispatcher(action: FlowAction) {
  switch (action.type) {
    default:
      console.log("Unknown actions type");
  }

  return {
    success: false,
    error: "Unknown actions type",
  };
}
