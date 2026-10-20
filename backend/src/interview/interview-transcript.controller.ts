
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { InterviewTranscriptService } from "./interview-transcript.service";
import { FinalizeInterviewDto } from "./dto/finalize-interview.dto";

type AuthenticatedRequest = Request & {
  user?: {
    userId?: string;
    sub?: string;
  };
};

@Controller("interview/sessions")
@UseGuards(AuthGuard("jwt"))
export class InterviewTranscriptController {
  constructor(
    private readonly transcriptService: InterviewTranscriptService,
  ) {}

  @Post("finalize")
  async finalize(
    @Req() req: AuthenticatedRequest,
    @Body() dto: FinalizeInterviewDto,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException(
        "Authenticated user ID is missing.",
      );
    }

    const data = await this.transcriptService.finalize(userId, dto);

    return {
      success: true,
      data,
      error: null,
    };
  }
}