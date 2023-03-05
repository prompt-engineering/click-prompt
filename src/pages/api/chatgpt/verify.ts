import { NextApiHandler } from "next";
import { getClientByUserId } from "./user";

// verify login state
const handler: NextApiHandler = async (req, res) => {
  const userId = req.cookies["PROMPT_GENERATOR_USER"];
  if (!userId) {
    res.status(200).json({ message: "You're not logged in yet!", loggedIn: false });
    return;
  }
  const client = getClientByUserId(userId);
  if (!client) {
    res.setHeader("Set-Cookie", "PROMPT_GENERATOR_USER=; Max-Age=0");
    res.status(200).json({ message: "Your login session has been expired!", loggedIn: false });
    return;
  }
  res.status(200).json({ message: "You're logged in!", loggedIn: true });
};
