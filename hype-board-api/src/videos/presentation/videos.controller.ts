import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { GetVideosUseCase } from '../application/get-videos.usecase';
import { Video } from '../domain/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly getVideosUseCase: GetVideosUseCase) {}

  @Get()
  async getVideos(): Promise<Video[]> {
    try {
      return await this.getVideosUseCase.execute();
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
