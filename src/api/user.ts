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
  }).then(it => it.json());

  if (response.error) {
    alert("Error(login): " + JSON.stringify(response.error));
    return;
  }

  return response;
}

export async function isLoggedIn(hashedKey?: string) {
  if (hashedKey == null) {
    return false;
  }

  const response = await fetch("/api/chatgpt/verify", {
    method: "POST",
    body: hashedKey ?? "",
  }).then(it => it.json());

  return response.loggedIn;
}
