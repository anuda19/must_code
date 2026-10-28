import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/wt-auth.guard';
import { DashboardService } from './dashboard.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId?: string;
    sub?: string;
  };
}

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('overview')
  async getOverview(
    @Req() req: AuthenticatedRequest,
    @Query('period') period?: string,
  ) {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      // The JWT guard should normally reject this first.
      throw new Error('Authenticated user ID is missing');
    }

    return {
      success: true,
      data: await this.dashboardService.getOverview(
        userId,
        period,
      ),
    };
  }
}