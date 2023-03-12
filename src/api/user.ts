import { SITE_INTERNAL_HEADER_URL } from "@/configs/constants";
import fetch from "node-fetch";

export async function logout() {
  const response = await fetch("/api/chatgpt/user", {
    method: "POST",
    body: JSON.stringify({
      action: "logout",
    }),
  });
  return response.json();
}

export async function login(key: string) {
  const response = await fetch("/api/chatgpt/user", {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      key,
    }),
  }).then((it) => it.json());

  if ((response as any).error) {
    alert("Error(login): " + JSON.stringify((response as any).error));
    return;
  }

  return response;
}

export async function isLoggedIn(hashedKey?: string) {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Client-side
    const response = await fetch("/api/chatgpt/verify", {
      method: "POST",
      body: hashedKey ?? "NOPE",
    }).then((it) => it.json());

    return (response as any).loggedIn;
  }

  console.log(process.version);
  console.log("patched: ", (fetch as any).__XX_PATCHED__)
  console.log("key", hashedKey);
  const { headers } = await import("next/headers");
  console.log("headers", headers);
  const urlStr = headers().get(SITE_INTERNAL_HEADER_URL) as string;
  console.log("urlStr", urlStr);
  // Propagate cookies to the API route
  const headersPropagated = { cookie: headers().get("cookie") as string };
  const response = await fetch(new URL("/api/chatgpt/verify", new URL(urlStr)), {
    method: "POST",
    body: hashedKey ?? "NOPE",
    headers: headersPropagated,
    redirect: "follow",
  }).then((it) => it.json());
  console.log("response", response);
  return (response as any).loggedIn;
}
