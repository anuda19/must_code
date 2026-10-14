// dto/update-user-profile.dto.ts
import { IsString, IsOptional, IsArray, IsEnum, IsUrl, IsNotEmpty, ArrayMinSize } from 'class-validator';

export enum ExperienceLevel {
  FRESHER = 'ENTRY_LEVEL',
  JUNIOR = 'MID_LEVEL',
  MID = 'SENIOR',
  SENIOR = 'LEAD',
}

export class UpdateUserProfileDto {
 @IsString()
  @IsNotEmpty({ message: 'Job role is required' })
  jobRole: string;

  @IsString()
  @IsNotEmpty({ message: 'Experience level is required' })
  experienceLevel: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'At least 1 skill is required' })
  skills: string[];

  @IsOptional()
  @IsString()
  targetCompany?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  jobDescription?: string;

//   @IsOptional()
//   @IsUrl()
//   cvUrl?: string;

//   @IsOptional()
//   @IsString()
//   cvFileName?: string;
}