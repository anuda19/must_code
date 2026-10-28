import 'dotenv/config';

import { cli, defineAgent, voice, WorkerOptions } from '@livekit/agents';

import * as google from '@livekit/agents-plugin-google';
import { CandidateProfile } from '../types/candidate-profile.types';
import { buildInterviewPrompt } from './prompts/interview.prompts';
export default defineAgent({
  entry: async (ctx) => {
    const metadata = JSON.parse(ctx.job.metadata || '{}') as {
      profile?: CandidateProfile;
    };

    const { profile } = metadata;

    if (!profile) {
      throw new Error('Candidate profile missing from job metadata');
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
        'Greet the candidate briefly and ask the first technical interview question tailored to their profile.',
    });
  },
});

cli.runApp(
  new WorkerOptions({
    agent: __filename,
    wsURL: process.env.LIVEKIT_URL!,
    agentName: process.env.LIVEKIT_AGENT_NAME!,
  }),
);
