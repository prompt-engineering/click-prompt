import { NextApiHandler } from "next";
import { decrypt, getUser, secret } from "@/pages/api/chatgpt/user";
import { createConversation, deleteConversation, getAllConversionsByUserId } from "@/storage/planetscale";

export type RequestCreateConversation = {
  action: "create_conversation";
  name: string;
};
export type ResponseCreateConversation = Awaited<ReturnType<typeof createConversation>>;

export type RequestDeleteConversation = {
  action: "delete_conversation";
  conversation_id: number;
};
export type ResponseDeleteConversation = Awaited<ReturnType<typeof deleteConversation>>;

export type RequestGetConversations = {
  action: "get_conversations";
  user_id: number;
};
export type ResponseGetConversations = Awaited<ReturnType<typeof getAllConversionsByUserId>>;

type RequestType = RequestCreateConversation | RequestDeleteConversation | RequestGetConversations;

const hander: NextApiHandler = async (req, res) => {
  if (!secret) {
    res.status(500).json({ message: "Secret is not set" });
    return;
  }

  const user = await getUser(req, res);
  if (!user) {
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  switch (body.action) {
    case "create_conversation": {
      const { name } = body as RequestCreateConversation;
      if (!name) {
        res.status(400).json({ message: "Name is required" });
        return;
      }
      const conversation = await createConversation({
        user_id: user.id as number,
        name,
      });

      return res.status(200).json(conversation);
    }
    case "delete_conversation": {
      const { conversation_id } = body as RequestDeleteConversation;
      if (!conversation_id) {
        res.status(400).json({ message: "Conversation id is required" });
        return;
      }
      const conversation = await deleteConversation(conversation_id);
      return res.status(200).json(conversation);
    }
    case "get_conversations": {
      const { user_id } = body as RequestGetConversations;
      if (!user_id) {
        res.status(400).json({ message: "User id is required" });
        return;
      }
      const conversations = await getAllConversionsByUserId(user_id);
      return res.status(200).json(conversations);
    }
    default: {
      return res.status(400).json({ message: "Invalid action" });
    }
  }
};
