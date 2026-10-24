// interview-evaluation.module.ts

import { Module } from '@nestjs/common';
import { InterviewEvaluationController } from './interview-evaluation.controller';
import { InterviewEvaluationService } from './interview-evaluation.service';

@Module({
  controllers: [InterviewEvaluationController],
  providers: [InterviewEvaluationService],
  exports: [InterviewEvaluationService],
})
export class InterviewEvaluationModule {}