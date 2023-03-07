import { getUserByUserId } from "@/pages/api/chatgpt/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const userId = cookies().get("PROMPT_GENERATOR_USER");

  if (!userId) {
    return new Response(JSON.stringify({ message: "You're not logged in yet!", loggedIn: false }), {
      status: 200,
    });
  }

  const user = getUserByUserId(userId.value);
  if (!user) {
    const response = NextResponse.next();
    response.cookies.set("Set-Cookie", "PROMPT_GENERATOR_USER=; Max-Age=0");

    return new Response(JSON.stringify({ message: "Your login session has been expired!", loggedIn: false }), {
      status: 200,
      headers: { "Set-Cookie": "PROMPT_GENERATOR_USER=; Max-Age=0" },
    });
  }

  return NextResponse.json({ message: "You're logged in!", loggedIn: true });
}
