import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ req: request , secret: process.env.NEXTAUTH_SECRET});
  return token;
}
