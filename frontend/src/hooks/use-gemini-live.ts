// "use client";

// import { useCallback, useRef, useState } from "react";
// import { GoogleGenAI, Modality } from "@google/genai";
// import { apiClient } from "@/lib/api.client";
// import { InterviewStatus } from "@/types/interview-types";

// const INPUT_SAMPLE_RATE = 16000;
// const OUTPUT_SAMPLE_RATE = 24000;

// function floatToPcm16(input: Float32Array): Int16Array {
//   const output = new Int16Array(input.length);
//   for (let i = 0; i < input.length; i++) {
//     const s = Math.max(-1, Math.min(1, input[i]));
//     output[i] = s < 0 ? s * 32768 : s * 32767;
//   }
//   return output;
// }

// function toBase64(pcm: Int16Array): string {
//   const bytes = new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength);
//   let binary = "";
//   const chunkSize = 0x8000;
//   for (let i = 0; i < bytes.length; i += chunkSize) {
//     binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
//   }
//   return btoa(binary);
// }

// function fromBase64(base64: string): Uint8Array {
//   const binary = atob(base64);
//   const bytes = new Uint8Array(binary.length);
//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }
//   return bytes;
// }

// type MockInterviewResponse = {
//   data: {
//     token: string;
//     model: string;
//   };
// };

// export function useGeminiLive() {
//   // Explicitly type status as InterviewStatus
//   const [status, setStatus] = useState<InterviewStatus>("idle");
//   const [error, setError] = useState<string | null>(null);

//   const sessionRef = useRef<any>(null);
//   const audioContextsRef = useRef<{ input?: AudioContext; output?: AudioContext }>({});
//   const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
//   const nextPlaybackTimeRef = useRef(0);
//   const streamRef = useRef<MediaStream | null>(null);

//   const stop = useCallback(async () => {
//     activeSourcesRef.current.forEach((source) => {
//       try { source.stop(); } catch {}
//     });
//     activeSourcesRef.current = [];

//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;

//     sessionRef.current?.close();
//     sessionRef.current = null;

//     if (audioContextsRef.current.input?.state !== "closed") {
//       await audioContextsRef.current.input?.close();
//     }
//     if (audioContextsRef.current.output?.state !== "closed") {
//       await audioContextsRef.current.output?.close();
//     }
//     audioContextsRef.current = {};
//     nextPlaybackTimeRef.current = 0;

//     setStatus("ended");
//   }, []);

//   const start = useCallback(async () => {
//     setStatus("connecting");
//     setError(null);

//     try {
//       const res = await apiClient.post<MockInterviewResponse>(
//         "/api/interview/mock-interview"
//       );
//       console.log("Received res from backend:", res);
//       const { token, model } = res.data;

//       if (!token || !model) throw new Error("Invalid auth token response from backend");

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
//       });
//       streamRef.current = stream;

//       const inputCtx = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE });
//       const outputCtx = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE });
//       audioContextsRef.current = { input: inputCtx, output: outputCtx };

//       await inputCtx.resume();
//       await outputCtx.resume();

//       const ai = new GoogleGenAI({
//         apiKey: token,
//         httpOptions: { apiVersion: "v1alpha" },
//       });

//       const session = await ai.live.connect({
//         model,
//         config: { responseModalities: [Modality.AUDIO] },
//         callbacks: {
//           onopen: () => setStatus("listening"), // Transition directly to listening once open
//           onerror: (err: any) => {
//             setError(err?.message || "Live session error");
//             setStatus("error");
//           },
//           onclose: () => setStatus("ended"),
//           onmessage: (event: any) => {
//             const content = event.serverContent;

//             if (content?.interrupted) {
//               activeSourcesRef.current.forEach((src) => {
//                 try { src.stop(); } catch {}
//               });
//               activeSourcesRef.current = [];
//               nextPlaybackTimeRef.current = outputCtx.currentTime;
//               setStatus("listening");
//             }

//             if (content?.modelTurn?.parts) {
//               for (const part of content.modelTurn.parts) {
//                 if (!part.inlineData?.data) continue;

//                 const bytes = fromBase64(part.inlineData.data);
//                 const pcm = new Int16Array(
//                   bytes.buffer,
//                   bytes.byteOffset,
//                   Math.floor(bytes.byteLength / 2)
//                 );

//                 const buffer = outputCtx.createBuffer(1, pcm.length, OUTPUT_SAMPLE_RATE);
//                 const channel = buffer.getChannelData(0);
//                 for (let i = 0; i < pcm.length; i++) {
//                   channel[i] = pcm[i] / 32768;
//                 }

//                 const source = outputCtx.createBufferSource();
//                 source.buffer = buffer;
//                 source.connect(outputCtx.destination);

//                 const startAt = Math.max(outputCtx.currentTime, nextPlaybackTimeRef.current);
//                 source.start(startAt);
//                 nextPlaybackTimeRef.current = startAt + buffer.duration;

//                 setStatus("speaking");

//                 activeSourcesRef.current.push(source);
//                 source.onended = () => {
//                   activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
//                   if (activeSourcesRef.current.length === 0) {
//                     setStatus("listening");
//                   }
//                 };
//               }
//             }

//             if (content?.turnComplete) {
//               setStatus("listening");
//             }
//           },
//         },
//       });

//       sessionRef.current = session;

//       const source = inputCtx.createMediaStreamSource(stream);
//       const processor = inputCtx.createScriptProcessor(4096, 1, 1);

//       processor.onaudioprocess = (e) => {
//         if (!sessionRef.current) return;
//         const inputData = e.inputBuffer.getChannelData(0);
//         const pcm16 = floatToPcm16(inputData);

//         sessionRef.current.sendRealtimeInput({
//           audio: {
//             data: toBase64(pcm16),
//             mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
//           },
//         });
//       };

//       source.connect(processor);
//       processor.connect(inputCtx.destination);
//     } catch (err: any) {
//       await stop();
//       setError(err?.message || "Failed to establish voice session.");
//       setStatus("error");
//     }
//   }, [stop]);

//   return { status, error, start, stop };
// }

// "use client";

// import { useCallback, useRef, useState } from "react";
// import { GoogleGenAI, Modality } from "@google/genai";
// import { apiClient } from "@/lib/api.client";
// import { InterviewStatus } from "@/types/interview-types";

// const INPUT_SAMPLE_RATE = 16000;
// const OUTPUT_SAMPLE_RATE = 24000;
// const PROCESSOR_BUFFER_SIZE = 4096;

// function floatToPcm16(input: Float32Array): Int16Array {
//   const output = new Int16Array(input.length);

//   for (let i = 0; i < input.length; i++) {
//     const sample = Math.max(-1, Math.min(1, input[i]));
//     output[i] = sample < 0 ? sample * 32768 : sample * 32767;
//   }

//   return output;
// }

// // Resample the microphone audio to the exact rate sent to Gemini.
// function resampleAudio(
//   input: Float32Array,
//   sourceRate: number,
//   targetRate: number
// ): Float32Array {
//   if (sourceRate === targetRate) {
//     return input;
//   }

//   const outputLength = Math.floor(
//     (input.length * targetRate) / sourceRate
//   );

//   const output = new Float32Array(outputLength);
//   const ratio = sourceRate / targetRate;

//   for (let i = 0; i < outputLength; i++) {
//     const position = i * ratio;
//     const left = Math.floor(position);
//     const right = Math.min(left + 1, input.length - 1);
//     const fraction = position - left;

//     output[i] =
//       input[left] * (1 - fraction) + input[right] * fraction;
//   }

//   return output;
// }

// function toBase64(pcm: Int16Array): string {
//   const bytes = new Uint8Array(
//     pcm.buffer,
//     pcm.byteOffset,
//     pcm.byteLength
//   );

//   let binary = "";
//   const chunkSize = 0x8000;

//   for (let i = 0; i < bytes.length; i += chunkSize) {
//     binary += String.fromCharCode(
//       ...bytes.subarray(i, i + chunkSize)
//     );
//   }

//   return btoa(binary);
// }

// function fromBase64(base64: string): Uint8Array {
//   const binary = atob(base64);
//   const bytes = new Uint8Array(binary.length);

//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }

//   return bytes;
// }

// type MockInterviewResponse = {
//   data: {
//     token: string;
//     model: string;
//   };
// };

// export function useGeminiLive() {
//   const [status, setStatus] = useState<InterviewStatus>("idle");
//   const [error, setError] = useState<string | null>(null);

//   const sessionRef = useRef<any>(null);

//   const audioContextsRef = useRef<{
//     input?: AudioContext;
//     output?: AudioContext;
//   }>({});

//   const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
//   const nextPlaybackTimeRef = useRef(0);
//   const streamRef = useRef<MediaStream | null>(null);

//   // Retain the microphone graph so it can be disconnected explicitly.
//   const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
//   const processorRef = useRef<ScriptProcessorNode | null>(null);
//   const silentGainRef = useRef<GainNode | null>(null);

//   // Prevent callbacks from an old session changing the current session.
//   const sessionIdRef = useRef(0);
//   const startedRef = useRef(false);

//   const stop = useCallback(async () => {
//     // Invalidate pending connection attempts and callbacks first.
//     sessionIdRef.current += 1;
//     startedRef.current = false;

//     const session = sessionRef.current;
//     sessionRef.current = null;

//     const processor = processorRef.current;
//     processorRef.current = null;

//     if (processor) {
//       processor.onaudioprocess = null;
//       try {
//         processor.disconnect();
//       } catch {}
//     }

//     try {
//       inputSourceRef.current?.disconnect();
//     } catch {}
//     inputSourceRef.current = null;

//     try {
//       silentGainRef.current?.disconnect();
//     } catch {}
//     silentGainRef.current = null;

//     for (const source of activeSourcesRef.current) {
//       source.onended = null;
//       try {
//         source.stop();
//       } catch {}
//       try {
//         source.disconnect();
//       } catch {}
//     }

//     activeSourcesRef.current = [];
//     nextPlaybackTimeRef.current = 0;

//     const stream = streamRef.current;
//     streamRef.current = null;
//     stream?.getTracks().forEach((track) => track.stop());

//     try {
//       session?.close();
//     } catch {}

//     const contexts = audioContextsRef.current;
//     audioContextsRef.current = {};

//     await Promise.all(
//       [contexts.input, contexts.output].map(async (ctx) => {
//         if (ctx && ctx.state !== "closed") {
//           try {
//             await ctx.close();
//           } catch {}
//         }
//       })
//     );

//     setStatus("ended");
//   }, []);

//   const start = useCallback(async () => {
//     // Avoid duplicate sessions from repeated clicks.
//     if (startedRef.current) return;

//     startedRef.current = true;
//     const sessionId = ++sessionIdRef.current;

//     setStatus("connecting");
//     setError(null);

//     try {
//       const res = await apiClient.post<MockInterviewResponse>(
//         "/api/interview/mock-interview"
//       );

//       if (sessionId !== sessionIdRef.current) return;

//       const { token, model } = res.data;

//       if (!token || !model) {
//         throw new Error("Invalid auth token response from backend");
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: {
//           channelCount: 1,
//           echoCancellation: true,
//           noiseSuppression: true,
//         },
//       });

//       if (sessionId !== sessionIdRef.current) {
//         stream.getTracks().forEach((track) => track.stop());
//         return;
//       }

//       streamRef.current = stream;

//       // Browsers may use a different actual rate than the requested rate.
//       const inputCtx = new AudioContext({
//         sampleRate: INPUT_SAMPLE_RATE,
//       });

//       const outputCtx = new AudioContext({
//         sampleRate: OUTPUT_SAMPLE_RATE,
//       });

//       audioContextsRef.current = {
//         input: inputCtx,
//         output: outputCtx,
//       };

//       await Promise.all([inputCtx.resume(), outputCtx.resume()]);

//       if (sessionId !== sessionIdRef.current) return;

//       const ai = new GoogleGenAI({
//         apiKey: token,
//         httpOptions: { apiVersion: "v1alpha" },
//       });

//       const session = await ai.live.connect({
//         model,
//         config: {
//           responseModalities: [Modality.AUDIO],
//         },
//         callbacks: {
//           onopen: () => {
//             if (sessionId !== sessionIdRef.current) return;
//             setStatus("listening");
//           },

//           onerror: (err: any) => {
//             if (sessionId !== sessionIdRef.current) return;

//             setError(err?.message || "Live session error");
//             setStatus("error");
//           },

//           onclose: () => {
//             if (sessionId !== sessionIdRef.current) return;

//             startedRef.current = false;
//             setStatus("ended");
//           },

//           onmessage: (event: any) => {
//             if (sessionId !== sessionIdRef.current) return;

//             const content = event.serverContent;

//             // Only an actual server interruption should cancel playback.
//             if (content?.interrupted) {
//               for (const source of activeSourcesRef.current) {
//                 source.onended = null;
//                 try {
//                   source.stop();
//                 } catch {}
//                 try {
//                   source.disconnect();
//                 } catch {}
//               }

//               activeSourcesRef.current = [];
//               nextPlaybackTimeRef.current = outputCtx.currentTime;
//               setStatus("listening");
//             }

//             const parts = content?.modelTurn?.parts;

//             if (parts) {
//               for (const part of parts) {
//                 const audioData = part.inlineData?.data;
//                 if (!audioData) continue;

//                 // Ignore unexpected non-audio inline data.
//                 if (
//                   part.inlineData?.mimeType &&
//                   !part.inlineData.mimeType.startsWith("audio/pcm")
//                 ) {
//                   continue;
//                 }

//                 const bytes = fromBase64(audioData);
//                 const sampleCount = Math.floor(bytes.byteLength / 2);

//                 if (sampleCount === 0) continue;

//                 // Copy samples to an aligned buffer before interpreting PCM16.
//                 const pcm = new Int16Array(sampleCount);
//                 const view = new DataView(
//                   bytes.buffer,
//                   bytes.byteOffset,
//                   bytes.byteLength
//                 );

//                 for (let i = 0; i < sampleCount; i++) {
//                   pcm[i] = view.getInt16(i * 2, true);
//                 }

//                 const buffer = outputCtx.createBuffer(
//                   1,
//                   pcm.length,
//                   OUTPUT_SAMPLE_RATE
//                 );

//                 const channel = buffer.getChannelData(0);

//                 for (let i = 0; i < pcm.length; i++) {
//                   channel[i] = pcm[i] / 32768;
//                 }

//                 const source = outputCtx.createBufferSource();
//                 source.buffer = buffer;
//                 source.connect(outputCtx.destination);

//                 // Keep chunks contiguous to prevent gaps in speech.
//                 const startAt = Math.max(
//                   outputCtx.currentTime,
//                   nextPlaybackTimeRef.current
//                 );

//                 source.start(startAt);
//                 nextPlaybackTimeRef.current = startAt + buffer.duration;

//                 activeSourcesRef.current.push(source);
//                 setStatus("speaking");

//                 source.onended = () => {
//                   try {
//                     source.disconnect();
//                   } catch {}

//                   activeSourcesRef.current =
//                     activeSourcesRef.current.filter(
//                       (active) => active !== source
//                     );

//                   if (sessionId !== sessionIdRef.current) return;

//                   // turnComplete can arrive before scheduled audio finishes.
//                   if (
//                     activeSourcesRef.current.length === 0 &&
//                     outputCtx.currentTime >=
//                       nextPlaybackTimeRef.current - 0.03
//                   ) {
//                     setStatus("listening");
//                   }
//                 };
//               }
//             }

//             if (content?.turnComplete) {
//               // Do not switch to listening while response audio is playing.
//               if (
//                 activeSourcesRef.current.length === 0 &&
//                 outputCtx.currentTime >=
//                   nextPlaybackTimeRef.current - 0.03
//               ) {
//                 setStatus("listening");
//               }
//             }
//           },
//         },
//       });

//       if (sessionId !== sessionIdRef.current) {
//         session.close();
//         return;
//       }

//       sessionRef.current = session;

//       // Set up microphone streaming only after the session is established.
//       const source = inputCtx.createMediaStreamSource(stream);
//       const processor = inputCtx.createScriptProcessor(
//         PROCESSOR_BUFFER_SIZE,
//         1,
//         1
//       );

//       // A zero-gain output keeps ScriptProcessor active without feeding
//       // microphone audio back to the speakers.
//       const silentGain = inputCtx.createGain();
//       silentGain.gain.value = 0;

//       inputSourceRef.current = source;
//       processorRef.current = processor;
//       silentGainRef.current = silentGain;

//       processor.onaudioprocess = (event) => {
//         if (
//           sessionId !== sessionIdRef.current ||
//           !sessionRef.current ||
//           inputCtx.state !== "running"
//         ) {
//           return;
//         }

//         const inputData = event.inputBuffer.getChannelData(0);

//         const resampled = resampleAudio(
//           inputData,
//           inputCtx.sampleRate,
//           INPUT_SAMPLE_RATE
//         );

//         const pcm16 = floatToPcm16(resampled);

//         try {
//           sessionRef.current.sendRealtimeInput({
//             audio: {
//               data: toBase64(pcm16),
//               mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
//             },
//           });
//         } catch (err: any) {
//           if (sessionId !== sessionIdRef.current) return;

//           setError(err?.message || "Failed to send microphone audio.");
//           setStatus("error");
//         }
//       };

//       source.connect(processor);
//       processor.connect(silentGain);
//       silentGain.connect(inputCtx.destination);
//     } catch (err: any) {
//       if (sessionId !== sessionIdRef.current) return;

//       await stop();

//       setError(err?.message || "Failed to establish voice session.");
//       setStatus("error");
//     }
//   }, [stop]);

//   return { status, error, start, stop };
// }

"use client";

import { useCallback, useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { apiClient } from "@/lib/api.client";
import { InterviewStatus, TranscriptMessage } from "@/types/interview-types";

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

function floatToPcm16(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 32768 : s * 32767;
  }
  return output;
}

function toBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

type MockInterviewResponse = {
  data: {
    token: string;
    model: string;
  };
};

export function useGeminiLive() {
  const [status, setStatus] = useState<InterviewStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const userTranscriptRef = useRef("");
  const assistantTranscriptRef = useRef("");
  const assistantMessageIdRef = useRef<string | null>(null);
  const userMessageIdRef = useRef<string | null>(null);

  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{
    input?: AudioContext;
    output?: AudioContext;
  }>({});
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlaybackTimeRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);

  const responseCompleteRef = useRef(true);

  const stop = useCallback(async () => {
    activeSourcesRef.current.forEach((source) => {
      source.onended = null;
      try {
        source.stop();
      } catch {}
    });
    activeSourcesRef.current = [];

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    sessionRef.current?.close();
    sessionRef.current = null;

    if (audioContextsRef.current.input?.state !== "closed") {
      await audioContextsRef.current.input?.close();
    }
    if (audioContextsRef.current.output?.state !== "closed") {
      await audioContextsRef.current.output?.close();
    }

    audioContextsRef.current = {};
    nextPlaybackTimeRef.current = 0;
    responseCompleteRef.current = true;

    setStatus("ended");
  }, []);

  const start = useCallback(async () => {
    setStatus("connecting");
    setError(null);
    responseCompleteRef.current = true;

    try {
      const res = await apiClient.post<MockInterviewResponse>(
        "/api/interview/mock-interview",
      );

      const { token, model } = res.data;

      if (!token || !model) {
        throw new Error("Invalid auth token response from backend");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const inputCtx = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE });
      const outputCtx = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      await inputCtx.resume();
      await outputCtx.resume();

      const ai = new GoogleGenAI({
        apiKey: token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => setStatus("listening"),

          onerror: (err: any) => {
            setError(err?.message || "Live session error");
            setStatus("error");
          },

          onclose: () => setStatus("ended"),

          onmessage: (event: any) => {

            const content = event.serverContent;
            const inputText = content?.inputTranscription?.text;

            if (inputText) {
              userTranscriptRef.current += inputText;

              const text = userTranscriptRef.current.trim();
              const id = userMessageIdRef.current ?? crypto.randomUUID();
              userMessageIdRef.current = id;

              setMessages((prev) => {
                const existing = prev.find((message) => message.id === id);

                if (existing) {
                  return prev.map((message) =>
                    message.id === id ? { ...message, text } : message,
                  );
                }

                return [
                  ...prev,
                  {
                    id,
                    role: "user",
                    text,
                    timestamp: new Date(),
                  },
                ];
              });
            }

            // Accumulate assistant's transcription chunks
            const outputText = content?.outputTranscription?.text;

            if (outputText) {
              assistantTranscriptRef.current += outputText;

              const text = assistantTranscriptRef.current.trim();
              const id = assistantMessageIdRef.current ?? crypto.randomUUID();

              assistantMessageIdRef.current = id;

              setMessages((prev) => {
                const existing = prev.find((message) => message.id === id);

                if (existing) {
                  return prev.map((message) =>
                    message.id === id ? { ...message, text } : message,
                  );
                }

                return [
                  ...prev,
                  {
                    id,
                    role: "assistant",
                    text,
                    timestamp: new Date(),
                  },
                ];
              });
            }

            // Finish the current turn
            if (content?.turnComplete) {
              userTranscriptRef.current = "";
              userMessageIdRef.current = null;

              assistantTranscriptRef.current = "";
              assistantMessageIdRef.current = null;
            }
            if (content?.interrupted) {
              activeSourcesRef.current.forEach((source) => {
                source.onended = null;
                try {
                  source.stop();
                } catch {}
              });

              activeSourcesRef.current = [];
              nextPlaybackTimeRef.current = outputCtx.currentTime;
              responseCompleteRef.current = true;
              setStatus("listening");
            }

            if (content?.modelTurn?.parts) {
              for (const part of content.modelTurn.parts) {
                if (!part.inlineData?.data) continue;

                const bytes = fromBase64(part.inlineData.data);
                const pcm = new Int16Array(
                  bytes.buffer,
                  bytes.byteOffset,
                  Math.floor(bytes.byteLength / 2),
                );

                if (pcm.length === 0) continue;

                const buffer = outputCtx.createBuffer(
                  1,
                  pcm.length,
                  OUTPUT_SAMPLE_RATE,
                );

                const channel = buffer.getChannelData(0);
                for (let i = 0; i < pcm.length; i++) {
                  channel[i] = pcm[i] / 32768;
                }

                const source = outputCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outputCtx.destination);

                const startAt = Math.max(
                  outputCtx.currentTime,
                  nextPlaybackTimeRef.current,
                );

                // New audio means the response is not fully played yet.
                responseCompleteRef.current = false;

                source.start(startAt);
                nextPlaybackTimeRef.current = startAt + buffer.duration;

                setStatus("speaking");
                activeSourcesRef.current.push(source);

                source.onended = () => {
                  activeSourcesRef.current = activeSourcesRef.current.filter(
                    (s) => s !== source,
                  );

                  if (
                    activeSourcesRef.current.length === 0 &&
                    responseCompleteRef.current
                  ) {
                    setStatus("listening");
                  }
                };
              }
            }

            // Generation may finish before scheduled audio playback.
            if (content?.turnComplete) {
              responseCompleteRef.current = true;

              if (activeSourcesRef.current.length === 0) {
                setStatus("listening");
              }
            }
          },
        },
      });

      sessionRef.current = session;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (!sessionRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = floatToPcm16(inputData);

        sessionRef.current.sendRealtimeInput({
          audio: {
            data: toBase64(pcm16),
            mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
          },
        });
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
    } catch (err: any) {
      await stop();
      setError(err?.message || "Failed to establish voice session.");
      setStatus("error");
    }
  }, [stop]);

  return { status, error, messages, start, stop };
}
