import { NextApiHandler } from "next";
import { getUserByUserId } from "./user";
import {SITE_USER_COOKIE} from "@/configs/const";

// verify login state
const handler: NextApiHandler = async (req, res) => {
  const userId = req.cookies[SITE_USER_COOKIE];
  if (!userId) {
    res.status(200).json({ message: "You're not logged in yet!", loggedIn: false });
    return;
  }
  const user = getUserByUserId(userId);
  if (!user) {
    res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
    res.status(200).json({ message: "Your login session has been expired!", loggedIn: false });
    return;
  }
  return res.status(200).json({ message: "You're logged in!", loggedIn: true });
};
export default handler;
