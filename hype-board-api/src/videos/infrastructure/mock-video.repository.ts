import { Injectable } from '@nestjs/common';
import { VideoRepository } from '../domain/video.repository';
import { Video } from '../domain/video.entity';
import { YoutubeMapper } from './youtube.mapper';
import { YoutubeVideoRawDto } from './dto/youtube-video-raw.dto';
import * as data from '../../data/mock-youtube-api.json';

@Injectable()
export class MockVideoRepository extends VideoRepository {
  findAll(): Promise<Video[]> {
    return Promise.resolve(
      data.items.map((item: YoutubeVideoRawDto) =>
        YoutubeMapper.toDomain(item),
      ),
    );
  }
}
