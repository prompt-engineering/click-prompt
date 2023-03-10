import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { cache } from "react";
import { chats as Chats, users as Users } from "@prisma/client";

interface Database {
  users: Users;
  chats: Chats;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

export const getAllChats = cache(async (userId: string) => {
  const data = await queryBuilder.selectFrom("chats").where("user_id", "=", userId).selectAll().execute();

  if (!data.length) {
    return null;
  }

  return data;
});

export const updateChatById = async (chatId: string, userId: string, chatContent: string, chatName: string) => {
  await queryBuilder
    .insertInto("chats")
    .values({ id: chatId, chat_name: chatName, user_id: userId, chat_content: chatContent, created_at: new Date() })
    .onDuplicateKeyUpdate({ chat_content: chatContent })
    .execute();
};

export const saveAndLoginUser = async (userId: string) => {
  await queryBuilder
    .insertInto("users")
    .values({ id: userId, created_at: new Date(), is_login: true })
    .onDuplicateKeyUpdate({ is_login: true })
    .execute();
};

export const getUserById = cache(async (userId: string) => {
  const data = await queryBuilder.selectFrom("users").where("id", "=", userId).selectAll().execute();

  if (!data.length) {
    return null;
  }

  return data[0];
});

export const logoutUser = async (userId: string) => {
  await queryBuilder.updateTable("users").where("id", "=", userId).set({ is_login: false }).execute();
};
