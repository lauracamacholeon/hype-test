import { Video } from './video.entity';

export abstract class VideoRepository {
  abstract findAll(): Promise<Video[]>;
}
