import { ApiAction, FlowAction, OpenAction } from "@/app/[lang]/click-flow/[id]/flow-action";
import fetch from "node-fetch";

export type ActionResult = ActionSuccess | ActionError;
export type ActionSuccess = {
  success: true;
  result?: any;
};

export type ActionError = {
  success: false;
  error: string;
};

async function openAction(openAction: OpenAction) {
  window.open(openAction.scheme);
  return {
    success: true,
  };
}

async function apiAction(apiAction: ApiAction, content: string) {
  // todo: show config for token, when user click on the action
  const { url, method, headers, body } = apiAction;
  const response = await fetch(`/api/action/proxy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      method,
      headers,
      body: body,
    }).replace('"$$response$$"', JSON.stringify(content)),
  });

  if (response.ok) {
    const { headers, body } = await response.json();
    return {
      success: true,
      result: body,
    };
  } else {
    return {
      success: false,
      error: await response.text(),
    };
  }
}

export async function actionDispatcher(action: FlowAction, content: string): Promise<ActionResult> {
  switch (action.type) {
    case "api":
      if (action.api) await apiAction(action.api!, content);
      break;
    case "open":
      if (action.open) await openAction(action.open!);
      break;
    default:
      console.log("Unknown action type");
  }

  return {
    success: false,
    error: "Unknown action type",
  };
}
