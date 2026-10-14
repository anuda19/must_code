// user-profile.service.ts
import {
  // Injectable,
  NotFoundException,
  InternalServerErrorException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserProfileDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserProfile(userId: string, dto: UpdateUserProfileDto) {
    try {
      // 1. Verify user exists first
      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      // 2. Upsert Profile (Create if missing, update if exists)
      const updatedProfile = await this.prisma.userProfile.upsert({
        where: {
          userId: userId,
        },
        update: {
          ...(dto.experienceLevel && { experienceLevel: dto.experienceLevel }),
          ...(dto.jobRole && { jobRole: dto.jobRole }),
          ...(dto.targetCompany !== undefined && {
            targetCompany: dto.targetCompany,
          }),
          ...(dto.skills && { skills: dto.skills }),
          ...(dto.bio !== undefined && { bio: dto.bio }),
          ...(dto.location !== undefined && { location: dto.location }),
          ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
        },
        create: {
          userId: userId,
          experienceLevel: dto.experienceLevel ?? 'ENTRY_LEVEL',
          jobRole: dto.jobRole ?? 'Software Engineer',
          targetCompany: dto.targetCompany,
          skills: dto.skills ?? [],
          bio: dto.bio,
          location: dto.location,
          avatarUrl: dto.avatarUrl,
        },
      });

      // const newInterview = await this.prisma.interview.create({
      //   data: {
      //     userId,
      //     jobDescription: dto.jobDescription || null, // Specific to THIS interview
      //     status: 'CREATED',
      //   },
      // });

      return {
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update user profile');
    }
  }

  async getUserProfile(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return profile;
  }
}
