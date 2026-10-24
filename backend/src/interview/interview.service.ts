import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EndSensitivity, GoogleGenAI, Modality, StartSensitivity } from '@google/genai';
import { PrismaService } from '../prisma/prisma.service';
import { buildInterviewPrompt } from './prompts/interview.prompts';

@Injectable()
export class InterviewService {
  private readonly gemini: GoogleGenAI;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.gemini = new GoogleGenAI({
      apiKey: this.config.getOrThrow<string>('GEMINI_API_KEY'),
    });
  }

  async createVoiceToken(userId: string, opts?: { baseline?: boolean }) {
    const profile = await this.prisma.userProfile.findUnique({ where: { userId } });
  if (!profile) throw new InternalServerErrorException('User profile not found');

  const model = this.config.getOrThrow<string>('GEMINI_LIVE_MODEL');
  console.log('[Live token] model =', model);

  const systemInstruction = opts?.baseline
    ? 'You are a friendly mock interviewer. Ask one short question at a time.'
    : buildInterviewPrompt(profile);

  console.log('[Live token] prompt chars =', systemInstruction.length);
    if (!profile) {
      throw new InternalServerErrorException('User profile not found');
    }

    // const model = this.config.getOrThrow<string>('GEMINI_LIVE_MODEL');

    // Generate Ephemeral Token scoped specifically to this live session
    const token = await this.gemini.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins session window
        newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(), // 1 min to initiate connection
        liveConnectConstraints: {
          model,
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: buildInterviewPrompt(profile),
            realtimeInputConfig: {
            automaticActivityDetection: {
              startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_HIGH,
              prefixPaddingMs: 20,
              silenceDurationMs: 400,
            },
          },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        },
      },
    });

    // Handle token format variations across SDK releases
    const tokenString =
      typeof token === 'string'
        ? token
        : (token as any).name || (token as any).value;

    return { token: tokenString, model };
  }
}
