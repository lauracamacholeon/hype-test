import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    VideosModule,
  ],
})
export class AppModule {}
