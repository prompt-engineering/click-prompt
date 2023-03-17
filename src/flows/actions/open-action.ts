import { OpenAction } from "@/flows/types/flow-action";

export async function openAction(openAction: OpenAction) {
  window.open(openAction.scheme);
  return {
    success: true,
  };
}
