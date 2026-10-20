import {
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FinalizeInterviewDto } from "./dto/finalize-interview.dto";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class InterviewTranscriptService {
  constructor(private readonly prisma: PrismaService) {}

  async finalize(userId: string, dto: FinalizeInterviewDto) {
    const startedAt = new Date(dto.startedAt);
    const endedAt = new Date(dto.endedAt);

    if (
      Number.isNaN(startedAt.getTime()) ||
      Number.isNaN(endedAt.getTime()) ||
      endedAt < startedAt
    ) {
      throw new Error("Invalid interview timestamps");
    }

    const messages =
      dto.messages as Prisma.InputJsonValue;

    const events =
      dto.events as Prisma.InputJsonValue;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.mockInterviewTranscript.findUnique({
        where: {
          clientSessionId: dto.sessionId,
        },
      });

      if (existing && existing.userId !== userId) {
        throw new ForbiddenException(
          "This interview session belongs to another user.",
        );
      }

      const saved = await tx.mockInterviewTranscript.upsert({
        where: {
          clientSessionId: dto.sessionId,
        },
        create: {
          clientSessionId: dto.sessionId,
          userId,
          model: dto.model ?? null,
          status: "COMPLETED",
          startedAt,
          endedAt,
          durationSeconds: dto.durationSeconds,
          messages,
          events,
          transcriptText: dto.transcriptText,
        },
        update: {
          model: dto.model ?? null,
          status: "COMPLETED",
          startedAt,
          endedAt,
          durationSeconds: dto.durationSeconds,
          messages,
          events,
          transcriptText: dto.transcriptText,
        },
      });

      return {
        saved: true,
        sessionId: saved.clientSessionId,
        databaseId: saved.id,
      };
    });
  }
}