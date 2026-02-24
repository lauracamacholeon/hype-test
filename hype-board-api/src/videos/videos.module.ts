import { Module } from '@nestjs/common';
import { VideosController } from './presentation/videos.controller';
import { GetVideosUseCase } from './application/get-videos.usecase';
import { VideoRepository } from './domain/video.repository';
import { MockVideoRepository } from './infrastructure/mock-video.repository';

@Module({
  controllers: [VideosController],
  providers: [
    GetVideosUseCase,
    {
      provide: VideoRepository,
      useClass: MockVideoRepository,
    },
  ],
})
export class VideosModule {}
