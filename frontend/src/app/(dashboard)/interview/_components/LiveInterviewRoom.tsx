
"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";

import InterviewRoomContent from "./InterviewRoomContent";
import { TranscriptItem } from "@/types/interview-types";


type LiveInterviewRoomProps = {
  room: {
    token: string;
    roomName: string;
    serverUrl: string;
  };
  onEnd: (transcript: TranscriptItem[]) => void;
  onDisconnect: () => void;
};

export default function LiveInterviewRoom({
  room,
  onEnd,
  onDisconnect,
}: LiveInterviewRoomProps) {
  return (
    <LiveKitRoom
      key={room.roomName}
      token={room.token}
      serverUrl={room.serverUrl}
      connect
      audio
      video={false}
      onError={(err) => {
        console.error("LiveKit error:", err);
      }}
      onDisconnected={onDisconnect}
    >
      <RoomAudioRenderer />

      <InterviewRoomContent
        roomName={room.roomName}
        onEnd={onEnd}
      />
    </LiveKitRoom>
  );
}
