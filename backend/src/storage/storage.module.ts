import { Module } from '@nestjs/common';
import { SupabaseStorageService } from './supabase-storage.service';
import { StorageController } from './storage.controller';

@Module({
  providers: [SupabaseStorageService],
  controllers: [StorageController],
  exports: [SupabaseStorageService],
})
export class StorageModule {}