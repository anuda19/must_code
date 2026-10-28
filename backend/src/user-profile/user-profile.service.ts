import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { SupabaseStorageService } from '../storage/supabase-storage.service';
import { UpdateUserProfileDto } from './dto/user.dto';

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: SupabaseStorageService,
  ) {}

  async updateUserProfile(userId: string, dto: UpdateUserProfileDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const profile = await this.prisma.userProfile.upsert({
        where: { userId },

        update: {
          ...(dto.experienceLevel !== undefined && {
            experienceLevel: dto.experienceLevel,
          }),
          ...(dto.jobRole !== undefined && {
            jobRole: dto.jobRole,
          }),
          ...(dto.targetCompany !== undefined && {
            targetCompany: dto.targetCompany,
          }),
          ...(dto.skills !== undefined && {
            skills: dto.skills,
          }),
          ...(dto.bio !== undefined && {
            bio: dto.bio,
          }),
          ...(dto.location !== undefined && {
            location: dto.location,
          }),

          // Save URLs received from the frontend.
          ...(dto.avatarUrl && {
            avatarUrl: dto.avatarUrl,
          }),
          ...(dto.cvUrl && {
            cvUrl: dto.cvUrl,
          }),
        },

        create: {
          userId,
          experienceLevel: dto.experienceLevel ?? 'ENTRY_LEVEL',
          jobRole: dto.jobRole ?? 'Software Engineer',
          targetCompany: dto.targetCompany ?? null,
          skills: dto.skills ?? [],
          bio: dto.bio ?? null,
          location: dto.location ?? null,
          avatarUrl: dto.avatarUrl || null,
          cvUrl: dto.cvUrl || null,
        },
      });

      return {
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update user profile');
    }
  }

  async getUserProfile(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: {
        userId: true,
        jobRole: true,
        experienceLevel: true,
        avatarUrl: true,
        cvUrl: true,
        cvFileName: true,
      },
    });
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return profile;
  }

  private getCvStoragePath(value: string): string {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return value;
    }

    let pathname: string;

    try {
      pathname = new URL(value).pathname;
    } catch {
      throw new BadRequestException('Invalid CV URL');
    }

    const markers = [
      '/storage/v1/object/public/resume/',
      '/storage/v1/object/sign/resume/',
      '/storage/v1/object/authenticated/resume/',
    ];

    for (const marker of markers) {
      const index = pathname.indexOf(marker);

      if (index !== -1) {
        return decodeURIComponent(pathname.slice(index + marker.length));
      }
    }

    throw new BadRequestException('Invalid CV storage path');
  }

  async getMyCvSignedUrl(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { cvUrl: true },
    });

    if (!profile?.cvUrl) {
      throw new NotFoundException('No CV uploaded');
    }

    const path = this.getCvStoragePath(profile.cvUrl);
    const signedUrl = await this.storage.createCvSignedUrl(path);

    return {
      success: true,
      data: { signedUrl },
    };
  }

  private getAvatarPathFromPublicUrl(url: string): string | null {
    try {
      const parsed = new URL(url);
      const marker = '/storage/v1/object/public/avatars/';
      const index = parsed.pathname.indexOf(marker);

      if (index === -1) return null;

      return decodeURIComponent(parsed.pathname.slice(index + marker.length));
    } catch {
      return null;
    }
  }

  private async cleanupOldFile(bucket: 'avatar' | 'resume', path: string) {
    try {
      await this.storage.deleteObject(bucket, path);
    } catch (error) {
      this.logger.warn(
        `Storage cleanup failed for ${bucket}/${path}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
