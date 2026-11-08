"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import MockInterviewPage from "./MockInterviewPage";
import InterviewEvaluation from "./InterviewEvaluation";
import { EvaluationLoaderDialog } from "./EvaluationLoadingDialog";
import { useInterviewSession } from "@/hooks/interview/useInterviewSession";
import LiveInterviewRoom from "./LiveInterviewRoom";

export function InterviewContainer() {
  const router = useRouter();

  const {
    phase,
    room,
    error,
    evaluation,
    evaluationStatus,
    startInterview,
    finishInterview,
    handleDisconnect,
    resetInterview,
  } = useInterviewSession();

  // Navigate to the report after successful evaluation.
  useEffect(() => {
    if (evaluationStatus !== "completed") return;

    const evaluationId = evaluation?.id;

    if (evaluationId) {
      router.push(`/interview/mock-interviews/evaluation/${evaluationId}`);
    }
  }, [evaluationStatus, evaluation?.id, router]);

  if (phase === "live" && room) {
    return (
      <LiveInterviewRoom
        room={room}
        onEnd={finishInterview}
        onDisconnect={handleDisconnect}
      />
    );
  }

  if (phase === "evaluating" || phase === "result") {
    return (
      <div className="w-full pt-2">
        <EvaluationLoaderDialog isOpen={phase === "evaluating"} />

        <InterviewEvaluation
          status={evaluationStatus}
          evaluation={evaluation}
          error={error}
          onClose={resetInterview}
        />
      </div>
    );
  }

  return (
    <MockInterviewPage
      loading={phase === "connecting" && !room}
      error={error}
      ended={phase === "ended"}
      startInterview={startInterview}
    />
  );
}
