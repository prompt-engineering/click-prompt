import { ApiAction } from "@/flows/types/flow-action";
import fetch from "node-fetch";

export async function apiProxy(apiAction: ApiAction, body?: string) {
  return await postApiAction(apiAction, body!);
}

async function postApiAction(apiAction: ApiAction, content: string) {
  // todo: show config for token, when user click on the actions
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
    const body = await response.json();
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
