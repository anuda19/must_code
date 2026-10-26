// interview-evaluation.module.ts

import { Module } from '@nestjs/common';
import { InterviewEvaluationController } from './interview-evaluation.controller';
import { InterviewEvaluationService } from './interview-evaluation.service';
import { InterviewTranscriptService } from './interview-transcript.service';
import { InterviewTranscriptController } from './interview-trancript.controller';

@Module({
  controllers: [InterviewEvaluationController, InterviewTranscriptController],
  providers: [InterviewEvaluationService, InterviewTranscriptService],
  exports: [InterviewEvaluationService, InterviewTranscriptService],
})
export class InterviewEvaluationModule {}