import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/wt-auth.guard';
import { SupabaseStorageService } from './supabase-storage.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId?: string;
    sub?: string;
  };
}

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: SupabaseStorageService) {}

  private getUserId(req: AuthenticatedRequest): string {
    const userId = req.user?.userId ?? req.user?.sub;

    if (!userId) {
      throw new BadRequestException('Authenticated user ID not found');
    }

    return userId;
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (_req, file, callback) => {
        if (
          !['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)
        ) {
          return callback(
            new BadRequestException(
              'Only JPEG, PNG, and WebP images are allowed',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }

    const userId = this.getUserId(req);

    return this.storageService.uploadAvatar(userId, file);
  }

  @Post('cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (_req, file, callback) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              'Only PDF, DOC, and DOCX files are allowed',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async uploadCv(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('CV file is required');
    }

    const userId = this.getUserId(req);

    return this.storageService.uploadCv(userId, file);
  }
  @Get('cv/signed-url')
  async getCvSignedUrl(
    @Req() req: AuthenticatedRequest,
    @Query('path') path: string,
  ) {
    if (!path) {
      throw new BadRequestException('CV path is required');
    }

    const userId = this.getUserId(req);

    if (!path.startsWith(`${userId}/`)) {
      throw new BadRequestException('Invalid CV path');
    }

    return {
      signedUrl: await this.storageService.createCvSignedUrl(path),
    };
  }
}
