
import { NextResponse } from "next/server";
import { api } from "@/lib/api";

type RouteContext = {
  params: Promise<{ sessionId: string }>;
};

// POST /api/interview/sessions/:sessionId
// Trigger evaluation.
export async function POST(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { sessionId } = await params;

    const result = await api.post(
      `/interview/sessions/${encodeURIComponent(sessionId)}/evaluate`,
      {},
    );
    console.log(result);
    
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Could not evaluate the interview.",
        },
      },
      { status: 500 },
    );
  }
}

// GET /api/interview/sessions/:sessionId
// Fetch the saved evaluation.
export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { sessionId } = await params;

    const result = await api.get(
      `/interview/sessions/${encodeURIComponent(sessionId)}/evaluation`,
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Could not fetch the interview evaluation.",
        },
      },
      { status: 500 },
    );
  }
}