// import { Module } from '@nestjs/common';
// import { createObserveModule } from '@nestjs/observe';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';

// export const { ObserveModule, ObserveInstrument } = createObserveModule();

// @Module({
//   imports: [
//     // Distributed tracing, auto-correlated logs, request/job metrics, error
//     // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
//     ObserveModule.forRoot({
//       appKey: 'YOUR_APP_KEY',
//       appSecret: 'YOUR_APP_SECRET',
//       serviceId: 'backend',
//     }),
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { LiveKitModule } from './livekit/livekit.module';
import { InterviewEvaluationModule } from './interview/interview-evaluation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    UserProfileModule,
    AuthModule,
    LiveKitModule,
    InterviewEvaluationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}