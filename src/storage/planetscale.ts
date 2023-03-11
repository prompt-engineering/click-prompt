import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { cache } from "react";

enum NumBool {
  True = 1,
  False = 0,
}

interface UserTable {
  id?: number;
  key_hashed: string;
  iv: string;
  key_encrypted: string;
  deleted?: NumBool;
  created_at?: string;
}

interface ConversationTable {
  id?: number;
  user_id: number;
  name: string;
  deleted?: NumBool;
  created_at?: string;
}

interface ChatTable {
  id?: number;
  conversation_id: number;
  role: string; // line 14
  content: string;
  name?: string;
  created_at?: string;
}

interface Database {
  users: UserTable;
  conversations: ConversationTable;
  chats: ChatTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

export const getAllConversionsByUserId = cache(async (userId: number) => {
  return queryBuilder
    .selectFrom("conversations")
    .select(["conversations.id", "conversations.user_id", "conversations.name", "conversations.created_at"])
    .where((qb) => qb.where("conversations.user_id", "=", userId).where("conversations.deleted", "=", 0))
    .limit(100)
    .execute();
});

export const getAllChatsInsideConversation = cache(async (conversationId: number) => {
  return queryBuilder
    .selectFrom("chats")
    .selectAll()
    .where("chats.conversation_id", "=", conversationId)
    .limit(100)
    .execute();
});

export const isValidUser = cache(async (keyHashed: string) => {
  return queryBuilder
    .selectFrom("users")
    .select("users.key_hashed")
    .where("users.deleted", "=", 0)
    .where("users.key_hashed", "=", keyHashed)
    .limit(1)
    .execute()
    .then((users) => users.length === 1);
});

export const createUser = cache(async (data: Pick<UserTable, "key_hashed" | "iv" | "key_encrypted">) => {
  return queryBuilder.insertInto("users").values(data).execute();
});

export const createConversation = cache(async (data: Pick<ConversationTable, "user_id" | "name">) => {
  return queryBuilder.insertInto("conversations").values(data).executeTakeFirst();
});

export const createChat = cache(async (data: Pick<ChatTable, "conversation_id" | "role" | "content" | "name">) => {
  console.log("createChat data: ", data);
  return queryBuilder.insertInto("chats").values(data).execute();
});

export const deleteConversation = cache(async (conversationId: number) => {
  return queryBuilder
    .updateTable("conversations")
    .set({
      deleted: 1,
    })
    .where("conversations.id", "=", conversationId)
    .execute();
});

export const getUserByKeyHashed = cache(async (keyHashed: string) => {
  const result = await queryBuilder
    .selectFrom("users")
    .selectAll()
    .where("users.key_hashed", "=", keyHashed)
    .limit(1)
    .execute();

  if (result.length !== 1) {
    return null;
  }

  return result[0];
});

// function generateDateTime() {
//   const date = new Date();
//   const padZero = (num: number) => num.toString().padStart(2, "0");
//   const datetime = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(
//     date.getHours(),
//   )}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
//   return datetime;
// }
