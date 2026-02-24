import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VideoRepository } from '../domain/video.repository';
import { Video } from '../domain/video.entity';

@Injectable()
export class GetVideosUseCase {
  constructor(private readonly videoRepository: VideoRepository) {}

  async execute(): Promise<Video[]> {
    try {
      const videos = await this.videoRepository.findAll();
      return videos.sort((a, b) => b.hype - a.hype);
    } catch {
      throw new InternalServerErrorException('Failed to retrieve videos');
    }
  }
}
