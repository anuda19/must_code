
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/wt-auth.guard';
import { InterviewTranscriptService } from './interview-transcript.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId?: string;
    sub?: string;
  };
}

@Controller('interview/sessions')
@UseGuards(JwtAuthGuard)
export class InterviewTranscriptController {
  constructor(
    private readonly transcriptService: InterviewTranscriptService,
  ) {}

  @Post()
  async saveTranscript(
    @Body()
    body: {
      sessionId: string;
      model: string;
      startedAt: string;
      endedAt: string;
      durationSeconds: number;
      messages: unknown[];
      events?: unknown[];
      transcriptText: string;
    },
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;
    console.log(userId);
    
    if (!userId) {
      throw new BadRequestException(
        'Authenticated user ID is missing',
      );
    }

    return this.transcriptService.saveTranscript(body, userId);
  }
}