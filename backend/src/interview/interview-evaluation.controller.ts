import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/wt-auth.guard';
import { InterviewEvaluationService } from './interview-evaluation.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId?: string;
    sub?: string;
  };
}

@Controller('interview/sessions')
@UseGuards(JwtAuthGuard)
export class InterviewEvaluationController {
  constructor(
    private readonly evaluationService: InterviewEvaluationService,
  ) {}

  @Post(':clientSessionId/evaluate')
  async evaluate(
    @Param('clientSessionId') clientSessionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Authenticated user ID is missing',
      );
    }

    if (!clientSessionId?.trim()) {
      throw new BadRequestException(
        'Client session ID is required',
      );
    }

    return this.evaluationService.evaluateInterview(
      clientSessionId,
      userId,
    );
  }
}