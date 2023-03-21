import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByKeyHashed } from "@/storage/planetscale";
import { SITE_USER_COOKIE } from "@/configs/constants";

export type User = Awaited<ReturnType<typeof getUserByKeyHashed>>;
export async function getUser(req: NextApiRequest, res: NextApiResponse): Promise<User | null> {
  const keyHashed = req.cookies[SITE_USER_COOKIE];
  if (!keyHashed) {
    res.status(400).json({ error: "You're not logged in yet!" });
    return null;
  }

  const user = await getUserByKeyHashed(keyHashed);
  if (!user) {
    kickOutUser(res);
    res.status(400).json({ error: "Your login session has been expired!" });
    return null;
  }
  return user;
}

export function kickOutUser(res: NextApiResponse) {
  res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
}
