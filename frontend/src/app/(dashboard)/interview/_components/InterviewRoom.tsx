"use client";

import { useEffect, useRef, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { useUser } from "@/hooks/useUser";
import {
  EvaluationStatus,
  InterviewEvaluation,
  TranscriptItem,
} from "@/types/interview-evalution";
import MockInterviewPage from "./MockInterviewPage";
import InterviewEvaluationCard from "./InterviewEvaluation";
import { useRouter } from "next/navigation";
import { EvaluationLoaderDialog } from "./EvaluationLoadingDialog";
import { startInterviewAction } from "@/actions/interview/session/start-interview";
import {
  evaluateInterview,
  saveInterviewTranscript,
} from "@/actions/interview/evaluation/interview-evaluation.actions";
import InterviewRoomContent from "./InterviewRoomContent";

export function InterviewRoom() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const clientSessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const [evaluationResult, setEvaluationResult] =
    useState<InterviewEvaluation | null>(null);

  const [evaluationStatus, setEvaluationStatus] =
    useState<EvaluationStatus>("idle");

  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const { data: user } = useUser();
  const profile = user?.profile;

  useEffect(() => {
    const evaluationId = evaluationResult?.id ?? clientSessionIdRef.current;
    if (evaluationStatus === "completed" && evaluationId) {
      router.push(`/interview/mock-interviews/evaluation/${evaluationId}`);
    }
  }, [evaluationStatus, evaluationResult, router]);

  async function startInterview() {
    if (loading) return;

    if (!profile) {
      setError("Please complete your profile before starting an interview.");
      return;
    }
    setLoading(true);
    clientSessionIdRef.current = crypto.randomUUID();
    startedAtRef.current = Date.now();
    setEvaluationResult(null);
    setError(null);
    setEnded(false);

    try {
      const result = await startInterviewAction({
        experienceLevel: profile.experienceLevel,
        jobRole: profile.jobRole,
        targetCompany: profile.targetCompany,
        skills: profile.skills,
        cvText: profile.cvText,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setToken(result.data.token);
      setRoomName(result.data.roomName);
      setServerUrl(result.data.serverUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start the interview.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function finishInterview(transcript: TranscriptItem[]) {
    setToken(null);
    setRoomName(null);
    setServerUrl(null);
    setEnded(true);
    setLoading(true);
    setError(null);
    setEvaluationResult(null);
    setEvaluationStatus("idle");
    setEvaluationError(null);

    try {
      const sessionId = clientSessionIdRef.current;
      const startedAt = startedAtRef.current;

      if (!sessionId || startedAt === null) {
        throw new Error("Interview session information is missing.");
      }

      const endedAt = Date.now();

      const transcriptText = transcript
        .map(
          (message) =>
            `${message.role === "assistant" ? "Interviewer" : "Candidate"}: ${message.text}`,
        )
        .join("\n");

      // Save transcript before requesting evaluation.
      const saveResponse = await saveInterviewTranscript({
        sessionId,
        model: "gemini-3.1-flash-live-preview",
        startedAt: new Date(startedAt).toISOString(),
        endedAt: new Date(endedAt).toISOString(),
        durationSeconds: Math.round((endedAt - startedAt) / 1000),
        messages: transcript,
        transcriptText,
      });

      if (!saveResponse.success) {
        throw new Error(saveResponse.message);
      }

      setLoading(false);
      setEvaluationStatus("evaluating");

      const evaluationResponse = await evaluateInterview(sessionId);

      if (!evaluationResponse.success) {
        setEvaluationStatus("failed");
        setEvaluationError(evaluationResponse.message);
        return;
      }

      const payload = evaluationResponse.data;

      const result = payload?.data;
      const record = result?.data ?? null;
      const status = result?.status ?? record?.status;

      setEvaluationResult(record);

      if (payload.success === false || result?.success === false) {
        setEvaluationStatus("failed");
        setEvaluationError(
          record?.errorMessage ??
            result?.message ??
            "Interview evaluation failed.",
        );
        return;
      }

      switch (status) {
        case "COMPLETED":
          setEvaluationStatus("completed");
          break;

        case "INSUFFICIENT_DATA":
          setEvaluationStatus("insufficient");
          setEvaluationError(
            record?.errorMessage ??
              result?.message ??
              "The transcript is too short to evaluate reliably.",
          );
          break;

        case "PROCESSING":
          setEvaluationStatus("evaluating");
          break;

        case "FAILED":
          setEvaluationStatus("failed");
          setEvaluationError(
            record?.errorMessage ?? result?.message ?? "Evaluation failed.",
          );
          break;

        default:
          setEvaluationStatus("failed");
          setEvaluationError(
            "The server returned an unknown evaluation status.",
          );
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save or evaluate the interview.";

      setError(message);
      setEvaluationError(message);
      setEvaluationStatus("failed");
    } finally {
      setLoading(false);
    }
  }

  function clearEvaluationState() {
    setEnded(false);
    setEvaluationResult(null);
    setEvaluationStatus("idle");
    setEvaluationError(null);
    setError(null);

    clientSessionIdRef.current = null;
    startedAtRef.current = null;
  }

  if (!token || !roomName || !serverUrl) {
    return ended ? (
      <div className="w-full pt-2">
        <EvaluationLoaderDialog isOpen={evaluationStatus === "evaluating"} />
        <InterviewEvaluationCard
          status={evaluationStatus}
          evaluation={evaluationResult}
          error={evaluationError}
          onClose={clearEvaluationState}
        />
      </div>
    ) : (
      <MockInterviewPage
        ended={ended}
        loading={loading}
        error={error}
        startInterview={startInterview}
      />
    );
  }

  return (
    <LiveKitRoom
      key={roomName}
      token={token}
      serverUrl={serverUrl}
      connect
      audio
      video={false}
      onError={(err) => setError(err.message || "LiveKit connection failed.")}
      onDisconnected={() => {
        setToken(null);
        setRoomName(null);
        setServerUrl(null);
      }}
    >
      <RoomAudioRenderer />
      <InterviewRoomContent roomName={roomName} onEnd={finishInterview}/>
    </LiveKitRoom>
  );
}