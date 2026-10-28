import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import 'multer';

@Injectable()
export class SupabaseStorageService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;

    if (!url || !key) {
      throw new Error('Supabase environment variables are missing');
    }

    this.supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const ext = extname(file.originalname).toLowerCase();
    const path = `${userId}/${randomUUID()}${ext}`;

    const { data, error } = await this.supabase.storage
      .from('avatar')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException(
        `Avatar upload failed: ${error.message}`,
      );
    }

    const { data: publicData } = this.supabase.storage
      .from('avatar')
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: publicData.publicUrl,
    };
  }

  async uploadCv(
  userId: string,
  file: Express.Multer.File,
): Promise<{ path: string }> {
  const ext = extname(file.originalname).toLowerCase();
  const path = `${userId}/${randomUUID()}${ext}`;

  const { data, error } = await this.supabase.storage
    .from('resume')
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new InternalServerErrorException(
      `CV upload failed: ${error.message}`,
    );
  }

  return { path: data.path };
}

async createCvSignedUrl(path: string): Promise<string> {
  const { data, error } = await this.supabase.storage
    .from('resume')
    .createSignedUrl(path, 300);

  if (error || !data?.signedUrl) {
    throw new InternalServerErrorException(
      'Could not generate CV download URL',
    );
  }

  return data.signedUrl;
}

  async deleteObject(bucket: 'avatar' | 'resume', path?: string | null) {
    if (!path) return;

    const { error } = await this.supabase.storage.from(bucket).remove([path]);

    if (error) {
      // The caller should log this; a failed cleanup must not
      // hide a successful database update.
      throw new Error(`Failed to delete ${bucket} object: ${error.message}`);
    }
  }
}
