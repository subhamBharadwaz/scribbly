import { NextResponse } from "next/server";

async function handler() {
  return NextResponse.json(
    { error: "User webhooks are managed by Better Auth." },
    { status: 410 },
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
