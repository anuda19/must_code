import { Global, Module } from '@nestjs/common';
import { Redis } from '@upstash/redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => Redis.fromEnv(),
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}