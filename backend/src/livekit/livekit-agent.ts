import 'dotenv/config';

import { cli, defineAgent, voice, WorkerOptions } from '@livekit/agents';

import * as google from '@livekit/agents-plugin-google';
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildInterviewPrompt } from './prompts/interview.prompts';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default defineAgent({
  entry: async (ctx) => {
    const participant = ctx.room.remoteParticipants.values().next().value;

    if (!participant?.identity) {
      throw new Error('Candidate participant identity not found.');
    }

    const userId = participant.identity;
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        experienceLevel: true,
        jobRole: true,
        targetCompany: true,
        skills: true,
        bio: true,
        location: true,
      },
    });

    if (!profile) {
      throw new Error(`User profile not found for userId: ${userId}`);
    }
    
    const instructions = buildInterviewPrompt(profile);

    const model = new google.beta.realtime.RealtimeModel({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'gemini-3.1-flash-live-preview',
      instructions,
    });

    const agent = new voice.Agent({
      instructions,
    });

    const session = new voice.AgentSession({
      llm: model,
    });

    await session.start({
      agent,
      room: ctx.room,
    });

    console.log(`[LiveKit Agent] Session started: ${ctx.room.name}`);

    await session.generateReply({
      instructions:
        'Greet the candidate briefly and ask the first technical interview question in English, tailored to their profile.',
    });
  },
});

cli.runApp(
  new WorkerOptions({
    agent: __filename,
    wsURL: process.env.LIVEKIT_URL!,
  }),
);
