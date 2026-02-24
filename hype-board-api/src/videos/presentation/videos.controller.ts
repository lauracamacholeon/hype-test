import { Controller, Get } from '@nestjs/common';
import { GetVideosUseCase } from '../application/get-videos.usecase';
import { Video } from '../domain/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly getVideosUseCase: GetVideosUseCase) {}

  @Get()
  async getVideos(): Promise<Video[]> {
    return this.getVideosUseCase.execute();
  }
}
