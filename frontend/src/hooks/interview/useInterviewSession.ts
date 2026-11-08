"use client";

import { useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";

import { startInterviewAction } from "@/actions/interview/session/start-interview";
import {
  evaluateInterview,
  saveInterviewTranscript,
} from "@/actions/interview/evaluation/interview-evaluation.actions";

import type {
  InterviewEvaluation,
  EvaluationStatus,
  TranscriptItem,
} from "@/types/interview-evalution";

const INTERVIEW_MODEL = "gemini-3.1-flash-live-preview";

export type InterviewPhase =
  | "ready"
  | "connecting"
  | "live"
  | "evaluating"
  | "result"
  | "ended";

type InterviewRoomData = {
  token: string;
  roomName: string;
  serverUrl: string;
};

export function useInterviewSession() {
  const { data: user } = useUser();
  const profile = user?.profile;

  const [phase, setPhase] = useState<InterviewPhase>("ready");
  const [room, setRoom] = useState<InterviewRoomData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(
    null,
  );

  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const finishingRef = useRef(false);

  // Derived state: no additional state required.
  const evaluationStatus: EvaluationStatus =
    phase === "evaluating"
      ? "evaluating"
      : phase === "result"
        ? evaluation?.status === "COMPLETED"
          ? "completed"
          : evaluation?.status === "INSUFFICIENT_DATA"
            ? "insufficient"
            : "failed"
        : "idle";

  async function startInterview() {
    if (phase !== "ready") return;

    if (!profile) {
      setError("Please complete your profile before starting an interview.");
      return;
    }

    setPhase("connecting");
    setError(null);
    setEvaluation(null);
    finishingRef.current = false;

    sessionIdRef.current = crypto.randomUUID();
    startedAtRef.current = Date.now();

    try {
      const response = await startInterviewAction({
        experienceLevel: profile.experienceLevel,
        jobRole: profile.jobRole,
        targetCompany: profile.targetCompany,
        skills: profile.skills,
        cvText: profile.cvText,
      });

      if (!response.success) {
        throw new Error(response.error);
      }

      setRoom({
        token: response.data.token,
        roomName: response.data.roomName,
        serverUrl: response.data.serverUrl,
      });

      setPhase("live");
    } catch (err) {
      sessionIdRef.current = null;
      startedAtRef.current = null;

      setError(
        err instanceof Error ? err.message : "Failed to start the interview.",
      );

      setPhase("ready");
    }
  }

  async function finishInterview(transcript: TranscriptItem[]) {
    // Prevent duplicate transcript saves and evaluation requests.
    if (finishingRef.current) return;

    finishingRef.current = true;

    const sessionId = sessionIdRef.current;
    const startedAt = startedAtRef.current;

    setRoom(null);
    setError(null);
    setEvaluation(null);
    setPhase("evaluating");

    try {
      if (!sessionId || startedAt === null) {
        throw new Error("Interview session information is missing.");
      }

      const endedAt = Date.now();

      const transcriptText = transcript
        .map(({ role, text }) => {
          const speaker = role === "assistant" ? "Interviewer" : "Candidate";

          return `${speaker}: ${text}`;
        })
        .join("\n");

      // Save transcript first.
      const saveResponse = await saveInterviewTranscript({
        sessionId,
        model: INTERVIEW_MODEL,
        startedAt: new Date(startedAt).toISOString(),
        endedAt: new Date(endedAt).toISOString(),
        durationSeconds: Math.round((endedAt - startedAt) / 1000),
        messages: transcript,
        transcriptText,
      });

      if (!saveResponse.success) {
        throw new Error(saveResponse.message);
      }

      // Trigger evaluation after successful transcript persistence.
      const response = await evaluateInterview(sessionId);

      if (!response.success) {
        throw new Error(response.message);
      }

      const payload = response.data;
      const result = payload.data;
      const record = result.data;

      setEvaluation(record);

      if (!payload.success || !result.success) {
        throw new Error(
          record?.errorMessage ??
            result.message ??
            "Interview evaluation failed.",
        );
      }

      switch (result.status) {
        case "COMPLETED":
          setPhase("result");
          break;

        case "INSUFFICIENT_DATA":
          setError(
            record?.errorMessage ??
              result.message ??
              "The transcript is too short to evaluate reliably.",
          );
          setPhase("result");
          break;

        case "FAILED":
          setError(
            record?.errorMessage ??
              result.message ??
              "Interview evaluation failed.",
          );
          setPhase("result");
          break;

        case "PROCESSING":
          // Evaluation is still running on the server.
          setPhase("evaluating");
          break;

        default:
          setError("Unknown evaluation status returned by the server.");
          setPhase("result");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save or evaluate the interview.",
      );

      setPhase("result");
    }
  }

  function handleDisconnect() {
    if (finishingRef.current || phase !== "live") return;

    setRoom(null);
    setError("Interview connection lost. Please start a new session.");
    setPhase("ready");

    sessionIdRef.current = null;
    startedAtRef.current = null;
  }

  function resetInterview() {
    setRoom(null);
    setError(null);
    setEvaluation(null);
    setPhase("ready");

    sessionIdRef.current = null;
    startedAtRef.current = null;
    finishingRef.current = false;
  }

  return {
    phase,
    room,
    error,
    evaluation,
    evaluationStatus,
    startInterview,
    finishInterview,
    handleDisconnect,
    resetInterview,
  };
}
