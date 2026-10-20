
import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await api.post(
      "/interview/sessions/finalize",
      body,
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Could not save the interview. Your local copy is retained.",
        },
      },
      { status: 500 },
    );
  }
}