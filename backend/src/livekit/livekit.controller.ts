// import {
//   Controller,
//   Get,
//   InternalServerErrorException,
//   Query,
// } from '@nestjs/common';
// import { LiveKitService } from './livekit.service';

// @Controller('api/livekit')
// export class LiveKitController {
//   constructor(private readonly liveKitService: LiveKitService) {}

//   @Get('token')
//   async getToken(@Query('identity') identity?: string) {
//     const result = await this.liveKitService.generateToken(identity);

//     if (!result.serverUrl) {
//       throw new InternalServerErrorException(
//         'LIVEKIT_URL is missing from backend .env',
//       );
//     }

//     return result;
//   }
// }

import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LiveKitService } from './livekit.service';
import { CandidateProfile } from '../types/candidate-profile.types';

@Controller('api/livekit')
export class LiveKitController {
  constructor(private readonly liveKitService: LiveKitService) {}

  @Post('token')
  async getToken(
    @Body()
    body: {
      profile: CandidateProfile;
      identity?: string;
    },
  ) {
    if (!body?.profile) {
      throw new InternalServerErrorException(
        'Candidate profile is required',
      );
    }

    const result = await this.liveKitService.generateToken(
      body.profile,
      body.identity,
    );

    if (!result.serverUrl) {
      throw new InternalServerErrorException(
        'LIVEKIT_URL is missing from backend .env',
      );
    }

    return result;
  }
}