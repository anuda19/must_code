import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { REDIS_CLIENT } from '../../redis/redis.module';
import { createHash } from 'node:crypto';

const SLIDING_WINDOW_SCRIPT = `
local current = tonumber(redis.call('GET', KEYS[1]) or '0')
local previous = tonumber(redis.call('GET', KEYS[2]) or '0')

local window = tonumber(ARGV[1])
local now = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local elapsed = now % window
local estimated = current + previous * ((window - elapsed) / window)

if estimated >= limit then
  return 0
end

redis.call('INCR', KEYS[1])
redis.call('PEXPIRE', KEYS[1], window * 2)

return 1
`;

@Injectable()
export class RateLimiterService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  private async consume(
    identifier: string,
    limit: number,
    windowMs: number,
  ): Promise<boolean> {
    const now = Date.now();
    const currentWindow = Math.floor(now / windowMs);

    const currentKey = `rate-limit:${identifier}:${currentWindow}`;
    const previousKey = `rate-limit:${identifier}:${currentWindow - 1}`;

    const result = await this.redis.eval(
      SLIDING_WINDOW_SCRIPT,
      [currentKey, previousKey],
      [windowMs, now, limit],
    );

    return Number(result) === 1;
  }

  async assertLoginAllowed(ip: string, email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();

    const emailHash = createHash('sha256')
      .update(normalizedEmail)
      .digest('hex');

    // IP limit: 30 requests per 15 minutes
    const ipAllowed = await this.consume(`login:ip:${ip}`, 30, 15 * 60 * 1000);

    if (!ipAllowed) {
      throw new HttpException(
        'Too many login attempts. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Account + IP limit: 10 requests per 15 minutes
    const accountAllowed = await this.consume(
      `login:account:${emailHash}:${ip}`,
      10,
      15 * 60 * 1000,
    );

    if (!accountAllowed) {
      throw new HttpException(
        'Too many login attempts. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
