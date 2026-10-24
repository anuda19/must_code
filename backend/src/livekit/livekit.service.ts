
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LiveKitService {
  async generateToken(identity?: string) {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new InternalServerErrorException(
        'LIVEKIT_API_KEY or LIVEKIT_API_SECRET is missing',
      );
    }

    const roomName = `interview-${randomUUID()}`;
    const participantIdentity = identity || `candidate-${randomUUID()}`;

    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      ttl: '30m',
    });

    accessToken.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    return {
      token: await accessToken.toJwt(),
      roomName,
      serverUrl: process.env.LIVEKIT_URL,
    };
  }
}