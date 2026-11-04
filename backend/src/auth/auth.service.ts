import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.usersService.create({
      name,
      email,
      passwordHash,
    });

    return this.generateTokens(user.id);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id);
  }

  async generateTokens(userId: string) {
    const payload = {
      sub: userId,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const tokenHash = await bcrypt.hash(refreshToken, 12);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    let payload: { sub: string };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: payload.sub,
        revokedAt: null,
      },
    });

    let storedToken: (typeof tokens)[number] | undefined;

    for (const token of tokens) {
      const matches = await bcrypt.compare(refreshToken, token.tokenHash);

      if (matches) {
        storedToken = token;
        break;
      }
    }

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    await this.prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return this.generateTokens(payload.sub);
  }

  async logout(refreshToken: string) {
    const tokens = await this.prisma.refreshToken.findMany();

    for (const token of tokens) {
      const matches = await bcrypt.compare(refreshToken, token.tokenHash);

      if (matches) {
        await this.prisma.refreshToken.update({
          where: {
            id: token.id,
          },
          data: {
            revokedAt: new Date(),
          },
        });

        return {
          message: 'Logged out successfully',
        };
      }
    }

    return {
      message: 'Logged out successfully',
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            experienceLevel: true,
            jobRole: true,
            targetCompany: true,
            skills: true,
            bio: true,
            location: true,
            avatarUrl: true,
            cvUrl: true,
            cvFileName: true,
            cvText: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });

    // Do not reveal whether the email exists.
    if (!user) return;

    // Generate a cryptographically secure random token.
    const resetToken = randomBytes(32).toString('hex');

    // Store only the SHA-256 hash.
    const tokenHash = createHash('sha256').update(resetToken).digest('hex');

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Invalidate previously issued tokens.
    await this.prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error('FRONTEND_URL is not configured.');
    }

    const resetUrl = new URL('/reset-password', frontendUrl);

    resetUrl.searchParams.set('token', resetToken);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: 'Reset Your Password | Xcode Technologies',
      html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#1e293b;">
        <h2 style="color:#4f46e5;">Reset your password</h2>

        <p>We received a request to reset your Xcode Technologies account password.</p>

        <p>Click the button below to create a new password.</p>

        <a
          href="${resetUrl.toString()}"
          style="display:inline-block;padding:13px 24px;background:#6366f1;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;"
        >
          Reset Password
        </a>

        <p style="margin-top:24px;font-size:13px;color:#64748b;">
          This link expires in 30 minutes. If you didn't request this,
          you can safely ignore this email.
        </p>

        <p style="font-size:12px;color:#94a3b8;">
          Xcode Technologies
        </p>
      </div>
    `,
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const now = new Date();

    await this.prisma.$transaction(async (tx) => {
      const resetToken = await tx.passwordResetToken.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: { gt: now },
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (!resetToken) {
        throw new BadRequestException(
          'This password reset link is invalid or has expired.',
        );
      }

      // Claim the token so it cannot be used again.
      const claimed = await tx.passwordResetToken.updateMany({
        where: {
          id: resetToken.id,
          usedAt: null,
          expiresAt: { gt: now },
        },
        data: {
          usedAt: now,
        },
      });

      if (claimed.count !== 1) {
        throw new BadRequestException(
          'This password reset link is invalid or has expired.',
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await tx.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash: hashedPassword },
      });

      // Invalidate any other outstanding reset links for this user.
      await tx.passwordResetToken.updateMany({
        where: {
          userId: resetToken.userId,
          id: { not: resetToken.id },
          usedAt: null,
        },
        data: {
          usedAt: now,
        },
      });
    });
  }
}
