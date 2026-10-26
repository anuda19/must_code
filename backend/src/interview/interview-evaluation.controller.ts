import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
  BadRequestException,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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
  constructor(private readonly evaluationService: InterviewEvaluationService) {}

  @Post(':clientSessionId/evaluate')
  async evaluate(
    @Param('clientSessionId') clientSessionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    if (!clientSessionId?.trim()) {
      throw new BadRequestException('Client session ID is required');
    }

    return this.evaluationService.evaluateInterview(clientSessionId, userId);
  }

  // @Get(':clientSessionId/evaluate')
  // async getEvaluation(
  //   @Param('clientSessionId') clientSessionId: string,
  //   @Req() req: AuthenticatedRequest,
  // ) {
  //   const userId = req.user?.userId ?? req.user?.sub;

  //   if (!userId) {
  //     throw new BadRequestException('Authenticated user ID is missing');
  //   }

  //   if (!clientSessionId?.trim()) {
  //     throw new BadRequestException('Client session ID is required');
  //   }

  //   return this.evaluationService.getEvaluation(clientSessionId, userId);
  // }
  @Get('evaluations')
  async getEvaluations(
    @Req() req: AuthenticatedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be positive integers');
    }

    return this.evaluationService.getEvaluations(userId, page, limit);
  }

  @Get('evaluations/:evaluationId')
  async getEvaluationById(
    @Param('evaluationId') evaluationId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    return this.evaluationService.getEvaluationById(evaluationId, userId);
  }
}
