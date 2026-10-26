
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SaveTranscriptInput } from '../types/mock-interview-transcript.types';

@Injectable()
export class InterviewTranscriptService {
  constructor(private readonly prisma: PrismaService) {}

  async saveTranscript(input: SaveTranscriptInput, userId: string) {
    const {
      sessionId,
      model,
      startedAt,
      endedAt,
      durationSeconds,
      messages,
      events = [],
      transcriptText,
    } = input;
    
    if (!sessionId?.trim()) {
      throw new BadRequestException('Session ID is required');
    }
    
    if (!Array.isArray(messages) || !transcriptText?.trim()) {
      throw new BadRequestException(
        'Transcript messages and transcript text are required',
      );
    }

    if (
      !Number.isFinite(durationSeconds) ||
      durationSeconds < 0 ||
      Number.isNaN(Date.parse(startedAt)) ||
      Number.isNaN(Date.parse(endedAt))
    ) {
      throw new BadRequestException('Invalid session metadata');
    }

    const data = {
      model,
      startedAt: new Date(startedAt),
      endedAt: new Date(endedAt),
      durationSeconds,
      messages: messages as Prisma.InputJsonValue,
      events: events as Prisma.InputJsonValue,
      transcriptText: transcriptText.trim(),
      status: 'COMPLETED' as const,
    };

    const existing =
      await this.prisma.mockInterviewTranscript.findFirst({
        where: {
          clientSessionId: sessionId,
          userId,
        },
        select: { id: true },
      });

    const transcript = existing
      ? await this.prisma.mockInterviewTranscript.update({
          where: { id: existing.id },
          data,
        })
      : await this.prisma.mockInterviewTranscript.create({
          data: {
            ...data,
            clientSessionId: sessionId,
            userId,
          },
        });

    return {
      success: true,
      data: {
        id: transcript.id,
        clientSessionId: transcript.clientSessionId,
        status: transcript.status,
      },
      message: 'Interview transcript saved successfully.',
    };
  }
}