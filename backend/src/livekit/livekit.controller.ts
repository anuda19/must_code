// import { Controller, Get, Query } from '@nestjs/common';
// import { LiveKitService } from './livekit.service';

// @Controller('api/livekit')
// export class LiveKitController {
//   constructor(private readonly livekitService: LiveKitService) {}

//   @Get('token')
//   async getToken(
//     @Query('room') room: string,
//     @Query('identity') identity: string,
//   ) {
//     const roomName = room || `room-${Math.random().toString(36).substring(7)}`;
//     const participantName = identity || `user-${Math.random().toString(36).substring(7)}`;
    
//     const token = await this.livekitService.generateToken(roomName, participantName);
    
//     // Optional: Trigger your Gemini session setup right as the room is initialized
//     await this.livekitService.connectRoomToGemini(roomName);

//     return { token, roomName };
//   }
// }

import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { LiveKitService } from './livekit.service';

@Controller('api/livekit')
export class LiveKitController {
  constructor(private readonly liveKitService: LiveKitService) {}

  @Get('token')
  async getToken(@Query('identity') identity?: string) {
    const result = await this.liveKitService.generateToken(identity);

    if (!result.serverUrl) {
      throw new InternalServerErrorException(
        'LIVEKIT_URL is missing from backend .env',
      );
    }

    return result;
  }
}