import { NextApiHandler } from "next";
import { getUser, kickOutUser, secret } from "@/pages/api/chatgpt/user";
import {
  changeConversationName,
  createConversation,
  deleteConversation,
  getAllConversionsByUserId,
} from "@/storage/planetscale";

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
};
export type ResponseGetConversations = Awaited<ReturnType<typeof getAllConversionsByUserId>>;

// change name
export type RequestChangeConversationName = {
  action: "change_conversation_name";
  conversation_id: number;
  name: string;
};
export type ResponseChangeConversationName = Awaited<ReturnType<typeof changeConversationName>>;

type RequestType =
  | RequestCreateConversation
  | RequestDeleteConversation
  | RequestGetConversations
  | RequestChangeConversationName;

const hander: NextApiHandler = async (req, res) => {
  if (!secret) {
    res.status(500).json({ error: "Secret is not set" });
    return;
  }

  const user = await getUser(req, res);
  if (!user) {
    return;
  }

  if (req.method !== "POST" || !req.body) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const body: RequestType = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  switch (body.action) {
    case "create_conversation": {
      const { name } = body;
      if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
      }

      const user = await getUser(req, res);
      if (!user) {
        return;
      }
      if (!user.id) {
        kickOutUser(res);
        res.status(400).json({ error: "You are not logged in" });
        return;
      }
      const conversation = await createConversation({
        name,
        user_id: user.id as number,
      });

      return res.status(200).json(conversation);
    }
    case "delete_conversation": {
      const { conversation_id } = body;
      if (!conversation_id) {
        res.status(400).json({ error: "Conversation id is required" });
        return;
      }
      const conversation = await deleteConversation(conversation_id);
      return res.status(200).json(conversation);
    }
    case "get_conversations": {
      const user = await getUser(req, res);
      if (!user) {
        return;
      }
      const conversations = await getAllConversionsByUserId(user.id as number);
      return res.status(200).json(conversations);
    }
    case "change_conversation_name": {
      const { conversation_id, name } = body;

      if (!conversation_id) {
        res.status(400).json({ error: "Conversation id is required" });
        return;
      }
      if (!name) {
        res.status(400).json({ error: "Name is required" });
        return;
      }
      const conversation = await changeConversationName(conversation_id, name);
      return res.status(200).json(conversation);
    }
    default: {
      return res.status(400).json({ error: "Invalid action" });
    }
  }
};
export default hander;
