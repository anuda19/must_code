
import {
  IsArray,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class FinalizeInterviewDto {
  @IsUUID()
  sessionId: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsISO8601()
  startedAt: string;

  @IsISO8601()
  endedAt: string;

  @IsInt()
  @Min(0)
  durationSeconds: number;

  @IsArray()
  messages: unknown[];

  @IsArray()
  events: unknown[];

  @IsString()
  transcriptText: string;
}
