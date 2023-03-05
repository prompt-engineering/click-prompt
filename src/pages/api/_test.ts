// test if api route is stateful

import { NextApiHandler } from "next";

let counter = 0;

const handler: NextApiHandler = async (req, res) => {
  return res.status(200).json({ counter: counter++ });
};
