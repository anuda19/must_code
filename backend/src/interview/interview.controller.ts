import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post('voice-token')
  @UseGuards(AuthGuard('jwt'))
  createVoiceToken(@Req() req: any) {
    return this.interviewService.createVoiceToken(req.user.userId);
  }
}