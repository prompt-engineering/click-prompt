import { NextApiHandler } from "next";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { isValidUser } from "@/storage/planetscale";

// verify login state
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const keyHashed = req.body.length > 10 ? req.body : req.cookies[SITE_USER_COOKIE] ?? "";

  if (!keyHashed) {
    res.status(200).json({ message: "You're not logged in yet!", loggedIn: false });
    return;
  }

  const isValid = isValidUser(keyHashed);
  if (!isValid) {
    res.setHeader("Set-Cookie", `${SITE_USER_COOKIE}=; Max-Age=0; HttpOnly; Path=/;`);
    res.status(200).json({ message: "Your login session has been expired!", loggedIn: false });
    return;
  }

  return res.status(200).json({ message: "You're logged in!", loggedIn: true });
};

export default handler;
