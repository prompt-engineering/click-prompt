import { SITE_LOCALE_COOKIE } from "@/configs/const";

export async function POST(request: Request) {
  const locale = await request.text();
  const response = new Response("OK", {
    status: 200,
    headers: {
      "Set-Cookie": `${SITE_LOCALE_COOKIE}=${locale}; Path=/;`,
    },
  });
  return response;
}
