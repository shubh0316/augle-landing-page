import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "waitlist.json");

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  if (data.emails.includes(email)) {
    return NextResponse.json({ message: "Already registered" }, { status: 200 });
  }

  data.emails.push(email);
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "Registered" }, { status: 201 });
}
