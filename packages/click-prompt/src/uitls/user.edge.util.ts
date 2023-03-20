import { getUserByKeyHashed } from "@/storage/planetscale";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { cookies } from "next/headers";

export type User = Awaited<ReturnType<typeof getUserByKeyHashed>>;
export async function getUser(): Promise<User | Response> {
  const cookieStore = cookies();
  const keyHashed = cookieStore.get(SITE_USER_COOKIE);
  if (!keyHashed) {
    return new Response(JSON.stringify({ error: "You're not logged in yet!" }), {
      status: 400,
    });
  }

  const user = await getUserByKeyHashed(keyHashed.value);
  if (!user) {
    return new Response(JSON.stringify({ error: "Your login session has been expired!" }), {
      status: 400,
      headers: { "Set-Cookie": `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;` },
    });
  }
  return user;
}
