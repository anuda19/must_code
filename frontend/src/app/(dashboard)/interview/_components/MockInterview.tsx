"use client";
import { useGeminiLive } from "@/hooks/use-gemini-live";
import { InterviewRoom } from "./InterviewRoom";

export default function MockInterviewPage() {
  const interview = useGeminiLive();

  async function handleEnd() {
    try {
      await interview.stop();
    } catch (error) {
      console.error("Error stopping interview session:", error);
    }
  }

  return (
    <InterviewRoom
      status={interview.status}
      muted={false}
      messages={interview.messages}
      error={interview.error}
      onStart={interview.start}
      onMute={() => {}}
      onEnd={handleEnd}
    />
  );
}
