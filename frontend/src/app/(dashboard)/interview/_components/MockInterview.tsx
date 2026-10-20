"use client";
import { useGeminiLive } from "@/hooks/useGeminiLive";
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
      evaluation={interview.evaluation}
      isEvaluating={interview.isEvaluating}
      onTryAgain={interview.onTryAgain}
      error={interview.error}
      onStart={interview.start}
      onMute={() => {}}
      onEnd={handleEnd}
    />
  );
}
