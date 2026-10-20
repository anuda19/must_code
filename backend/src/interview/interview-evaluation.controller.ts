
import {
  Controller,
  Param,
  Post,
  Get,
  Req,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { InterviewEvaluationService } from "./interview-evaluation.service";
import { JwtAuthGuard } from "../auth/guards/wt-auth.guard";

@Controller("interview")
@UseGuards(JwtAuthGuard)
export class InterviewEvaluationController {
  constructor(
    private readonly evaluationService: InterviewEvaluationService,
  ) {}

  // POST: Generate and save an evaluation
  @Post("sessions/:clientSessionId/evaluate")
  async evaluate(
    @Param("clientSessionId") clientSessionId: string,
    @Req() req: { user: { userId?: string; sub?: string } },
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException(
        "Authenticated user ID is missing",
      );
    }

    const evaluation = await this.evaluationService.evaluate(
      clientSessionId,
      userId,
    );

    return {
      success: true,
      data: evaluation,
      error: null,
    };
  }

  // GET: Fetch an existing evaluation
  @Get("sessions/:clientSessionId/evaluate")
  async getEvaluation(
    @Param("clientSessionId") clientSessionId: string,
    @Req() req: { user: { userId?: string; sub?: string } },
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException(
        "Authenticated user ID is missing",
      );
    }

    const evaluation =
      await this.evaluationService.getEvaluation(
        clientSessionId,
        userId,
      );

    if (!evaluation) {
      throw new NotFoundException(
        "Evaluation not found",
      );
    }

    return {
      success: true,
      data: evaluation,
      error: null,
    };
  }
}
