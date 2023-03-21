import { NextApiHandler } from "next";
import { getUser } from "@/uitls/user.util";
import {
  changeConversationName,
  createConversation,
  deleteAllConversationsByUserId,
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

export type RequestDeleteAllConversation = {
  action: "delete_all_conversations";
};
export type ResponseDeleteAllConversation = {
  message?: string;
  error?: string;
};

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
  | RequestDeleteAllConversation
  | RequestGetConversations
  | RequestChangeConversationName;

const hander: NextApiHandler = async (req, res) => {
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
    case "delete_all_conversations": {
      try {
        await deleteAllConversationsByUserId(user.id as number);
        return res.status(200).json({
          message: "Delete all conversation successfully",
        });
      } catch (e) {
        return res.status(400).json({
          error: "Delete all conversation failed: " + JSON.stringify(e),
        });
      }
    }
    case "get_conversations": {
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
      return res.status(400).json({ error: "Invalid actions" });
    }
  }
};
export default hander;
