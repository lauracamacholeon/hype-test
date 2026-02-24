import { Video } from '../domain/video.entity';
import { YoutubeVideoRawDto } from './dto/youtube-video-raw.dto';

export class YoutubeMapper {
  static toDomain(raw: YoutubeVideoRawDto): Video {
    return new Video(
      raw.id,
      raw.snippet.thumbnails.high.url,
      raw.snippet.title,
      raw.snippet.channelTitle,
      YoutubeMapper.getRelativeTime(raw.snippet.publishedAt),
      YoutubeMapper.calculateHype(raw),
    );
  }

  private static calculateHype(raw: YoutubeVideoRawDto): number {
    const { statistics, snippet } = raw;

    if (statistics.commentCount === undefined) return 0;

    const views = parseInt(statistics.viewCount, 10);
    const likes = parseInt(statistics.likeCount, 10);
    const comments = parseInt(statistics.commentCount, 10);

    if (views === 0) return 0;

    const baseHype = (likes + comments) / views;
    const hasTutorial = /tutorial/i.test(snippet.title);

    return hasTutorial ? baseHype * 2 : baseHype;
  }

  private static getRelativeTime(dateString: string): string {
    const published = new Date(dateString).getTime();
    const now = Date.now();
    const diffMs = now - published;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 60)
      return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    if (days < 30) return `Hace ${days} día${days !== 1 ? 's' : ''}`;
    if (months < 12) return `Hace ${months} mes${months !== 1 ? 'es' : ''}`;
    return `Hace ${years} año${years !== 1 ? 's' : ''}`;
  }
}
