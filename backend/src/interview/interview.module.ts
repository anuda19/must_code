
import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { InterviewTranscriptController } from './interview-transcript.controller';
import { InterviewTranscriptService } from './interview-transcript.service';
import { PrismaService } from '../prisma/prisma.service';
import { InterviewEvaluationController } from './interview-evaluation.controller';
import { InterviewEvaluationService } from './interview-evaluation.service';

@Module({
  controllers: [InterviewController, InterviewTranscriptController, InterviewEvaluationController],
  providers: [InterviewService, InterviewTranscriptService, InterviewEvaluationService, PrismaService],
})
export class InterviewModule {}
