import { ApiAction, FlowAction, OpenAction } from "@/app/[lang]/click-flow/[id]/flow-action";
import fetch from "node-fetch";

async function openAction(openAction: OpenAction) {
  window.open(openAction.scheme);
}

// export type ApiAction = {
//   url: string;
//   method: string;
//   headers: {
//     name: string;
//     value: string;
//   }[];
//   body: string;
// };
// wrapper api action request to /api/proxy
async function apiAction(apiAction: ApiAction) {
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
      body,
    }),
  });
  if (response.ok) {
    const { headers, body } = await response.json();
    return {
      success: true,
      headers: headers,
      result: body,
    };
  } else {
    return {
      success: false,
      error: await response.text(),
    };
  }
}

export async function actionDispatcher(action: FlowAction) {
  switch (action.type) {
    case "api":
      if (action.api) await apiAction(action.api!);
      break;
    case "open":
      if (action.open) openAction(action.open!);
      break;
    default:
      console.log("Unknown action type");
  }
}
