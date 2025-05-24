import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(request: NextRequest) {
  const nextAuthToken = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  if (nextAuthToken) {
    return nextAuthToken;
  }
  
  const authHeader = request.headers.get("authorization");
  let customToken = null;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    customToken = authHeader.substring(7);
  } else {
    customToken = request.cookies.get("auth-token")?.value;
  }
  
  if (customToken) {
    try {
      const decoded = jwt.verify(customToken, process.env.JWT_SECRET!) as any;
      return {
        id: decoded.id,
        email: decoded.email,
        sub: decoded.id.toString(),
      };
    } catch (error) {
      console.error("Custom JWT verification failed:", error);
      return null;
    }
  }
  
  return null;
}