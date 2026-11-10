"use client";

import { useRef, useState } from "react";

import { useUser } from "@/hooks/useUser";

import { startInterviewAction } from "@/actions/interview/session/start-interview";

import {
  evaluateInterview,
  saveInterviewTranscript,
} from "@/actions/interview/evaluation/interview-evaluation.actions";
import {
  EvaluationResponse,
  EvaluationStatus,
  InterviewEvaluation,
  InterviewPhase,
  InterviewRoom,
  TranscriptItem,
} from "@/types/interview-types";

const INTERVIEW_MODEL = "gemini-3.1-flash-live-preview";

export function useInterviewSession() {
  const { data: user } = useUser();
  const profile = user?.profile;

  const [phase, setPhase] = useState<InterviewPhase>("ready");
  const [room, setRoom] = useState<InterviewRoom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(
    null,
  );

  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const finishingRef = useRef(false);

  // ============================================
  // Start interview
  // ============================================

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

    const sessionId = crypto.randomUUID();

    sessionIdRef.current = sessionId;
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

  // ============================================
  // Finish interview
  // ============================================

  async function finishInterview(transcript: TranscriptItem[]) {
    if (finishingRef.current || phase !== "live") return;

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

      // Save transcript.

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

      // Evaluate saved transcript.
      const response = await evaluateInterview(sessionId);

      if (!response.success || !response.data) {
        throw new Error(response.error?.message ?? "Evaluation failed");
      }

      const { data: report, status, message } = response.data;

      setEvaluation(report);
      handleEvaluationStatus(status, report);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save or evaluate the interview.",
      );

      setPhase("result");
    } finally {
      // The interview has finished. Prevent duplicate submissions.
      finishingRef.current = false;
    }
  }

  // ============================================
  // Handle evaluation status
  // ============================================

  function handleEvaluationStatus(
    status: EvaluationStatus,
    record: InterviewEvaluation | null,
  ) {
    switch (status) {
      case "COMPLETED":
        setError(null);
        setPhase("result");
        break;

      case "INSUFFICIENT_DATA":
        setError(
          record?.errorMessage ??
            "The transcript is too short to evaluate reliably.",
        );
        setPhase("result");
        break;

      case "FAILED":
        setError(record?.errorMessage ?? "Interview evaluation failed.");
        setPhase("result");
        break;

      case "PROCESSING":
        setError(null);
        setPhase("evaluating");
        break;
    }
  }

  // ============================================
  // Handle unexpected disconnect
  // ============================================

  function handleDisconnect() {
    if (finishingRef.current || phase !== "live") return;

    setRoom(null);
    setError("Interview connection lost. Please start a new session.");

    setPhase("ready");

    sessionIdRef.current = null;
    startedAtRef.current = null;
  }

  // ============================================
  // Reset interview
  // ============================================

  function resetInterview() {
    setRoom(null);
    setError(null);
    setEvaluation(null);

    sessionIdRef.current = null;
    startedAtRef.current = null;

    finishingRef.current = false;

    setPhase("ready");
  }

  return {
    phase,
    room,
    error,
    evaluation,

    startInterview,
    finishInterview,
    handleDisconnect,
    resetInterview,
  };
}
