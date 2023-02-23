import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const jwtKey = new TextEncoder().encode(process.env.JWT_KEY);
  const ifTokenIsValid = authToken ? await jwtVerify(authToken, jwtKey) : null;

  if (ifTokenIsValid) {
    return NextResponse.next();
  } else {
    return new NextResponse(JSON.stringify({ err: "Unauthorized request!" }), {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/api/follow-tvshow", "/api/followed-tvshows/:userId*"],
};
