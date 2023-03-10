import { NextApiHandler } from "next";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { getUserById } from "@/storage/planetscale";
import { getLocalUser } from "@/pages/api/chatgpt/user";

// verify login state
const handler: NextApiHandler = async (req, res) => {
  const userId = req.cookies[SITE_USER_COOKIE];
  if (!userId) {
    res.status(200).json({ message: "You're not logged in yet!", loggedIn: false });
    return;
  }

  const user = process.env.IS_LOCAL === "true" ? getLocalUser() : await getUserById(userId);
  console.log(user, "verify");
  if (!user) {
    res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
    res.status(200).json({ message: "Your login session has been expired!", loggedIn: false });
    return;
  }

  return res.status(200).json({ message: "You're logged in!", loggedIn: true });
};

export default handler;
