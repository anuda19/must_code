import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI, Modality } from '@google/genai';
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

  async createVoiceToken(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new InternalServerErrorException('User profile not found');
    }

    const model = this.config.getOrThrow<string>('GEMINI_LIVE_MODEL');

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
