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
    startInterview,
    finishInterview,
    handleDisconnect,
    resetInterview,
  } = useInterviewSession();

  useEffect(() => {
    if (evaluation?.status !== "COMPLETED" || !evaluation.id) return;

    router.push(`/interview/mock-interviews/evaluation/${evaluation.id}`);
  }, [evaluation?.status, evaluation?.id, router]);

  if (phase === "live" && room) {
    return (
      <LiveInterviewRoom
        room={room}
        onEnd={finishInterview}
        onDisconnect={handleDisconnect}
      />
    );
  }
  console.log("evaluation:", evaluation);

  if (phase === "evaluating") {
    return <EvaluationLoaderDialog isOpen />;
  }

  if (phase === "result") {
    return (
      <div className="w-full pt-2">
        <InterviewEvaluation
          status={evaluation?.status ?? "FAILED"}
          evaluation={evaluation}
          error={error}
          onClose={resetInterview}
        />
      </div>
    );
  }

  return (
    <MockInterviewPage
      loading={phase === "connecting"}
      error={error}
      ended={false}
      startInterview={startInterview}
    />
  );
}
