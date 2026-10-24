
// import 'dotenv/config';

// import {
//   cli,
//   defineAgent,
//   voice,
//   WorkerOptions,
// } from '@livekit/agents';

// import * as google from '@livekit/agents-plugin-google';

// const instructions = `
// You are a professional technical interviewer.

// Ask one technical question at a time.
// Wait until the candidate finishes speaking.
// Respond naturally and briefly.
// Ask relevant follow-up questions.
// Never reveal the expected answer before the candidate attempts it.
// Do not repeat questions unnecessarily.
// Keep every spoken response to 1-3 short sentences.
// Do not narrate your reasoning or discuss internal processing.
// Stay focused on the interview, even if the candidate comments on response speed.
// `;

// export default defineAgent({
//   entry: async (ctx) => {
//     console.log(`[LiveKit Agent] Joining room: ${ctx.room.name}`);

//     const model = new google.beta.realtime.RealtimeModel({
//       apiKey: process.env.GOOGLE_API_KEY!,
//       //   model: 'gemini-2.5-flash-native-audio-preview-12-2025',
//       model: 'gemini-3.1-flash-live-preview',
//       instructions,
//     });

//     const agent = new voice.Agent({
//       instructions,
//     });

//     const session = new voice.AgentSession({
//       llm: model,
//     });

//     await session.start({
//       agent,
//       room: ctx.room,
//     });

//     console.log(`[LiveKit Agent] Session started: ${ctx.room.name}`);

//     await session.generateReply({
//       instructions:
//         'Greet the candidate briefly and ask the first technical interview question.',
//     });
//   },
// });

// cli.runApp(
//   new WorkerOptions({
//     agent: __filename,
//     wsURL: process.env.LIVEKIT_URL!,
//   }),
// );

import 'dotenv/config';

import {
  cli,
  defineAgent,
  voice,
  WorkerOptions,
} from '@livekit/agents';

import * as google from '@livekit/agents-plugin-google';
import { CandidateProfile } from '../types/candidate-profile.types';
import { buildInterviewPrompt } from './prompts/interview.prompts';
export default defineAgent({
  entry: async (ctx) => {
    console.log(`[LiveKit Agent] Joining room: ${ctx.room.name}`);

    const metadata = JSON.parse(ctx.job.metadata || '{}') as {
      profile?: CandidateProfile;
    };

    const profile = metadata.profile;

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