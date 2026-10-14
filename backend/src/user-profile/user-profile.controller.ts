// user-profile.controller.ts
import { Controller, Patch, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/wt-auth.guard';
import { UpdateUserProfileDto } from './dto/user.dto';
import { UserProfileService } from './user-profile.service';

@Controller('users/user-profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Patch()
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserProfileDto) {
    const userId = req.user.userId;

    return this.userProfileService.updateUserProfile(userId, dto);
  }

  @Get()
  async getProfile(@Req() req: any) {
    const userId = req.user.userId;

    return this.userProfileService.getUserProfile(userId);
  }
}
