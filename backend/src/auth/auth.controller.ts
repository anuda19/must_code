import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/wt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.name, dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(
    @Req()
    req: Request & {
      user: { userId: string };
    },
  ) {
    return this.authService.getMe(req.user.userId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);

    return {
      success: true,
      message:
        'If an account exists for this email, a password reset link has been sent.',
    };
  }
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);

    return {
      success: true,
      message: 'Your password has been reset successfully.',
    };
  }
}
