import { YoutubeMapper } from './youtube.mapper';
import { YoutubeVideoRawDto } from './dto/youtube-video-raw.dto';

const buildRawVideo = (
  overrides: Partial<YoutubeVideoRawDto> = {},
): YoutubeVideoRawDto => ({
  id: 'vid_001',
  snippet: {
    title: 'AWS explicado fácil',
    channelTitle: 'JuniorDev99',
    publishedAt: new Date().toISOString(),
    thumbnails: {
      high: { url: 'https://via.placeholder.com/300x200' },
    },
  },
  statistics: {
    viewCount: '1000',
    likeCount: '100',
    commentCount: '50',
  },
  ...overrides,
});

describe('YoutubeMapper', () => {
  describe('toDomain', () => {
    it('should map raw video to domain entity correctly', () => {
      const raw = buildRawVideo();
      const video = YoutubeMapper.toDomain(raw);

      expect(video.id).toBe('vid_001');
      expect(video.thumbnail).toBe('https://via.placeholder.com/300x200');
      expect(video.title).toBe('AWS explicado fácil');
      expect(video.author).toBe('JuniorDev99');
      expect(video.hype).toBeGreaterThan(0);
    });
  });

  describe('calculateHype', () => {
    it('should calculate base hype correctly', () => {
      const raw = buildRawVideo({
        statistics: { viewCount: '1000', likeCount: '100', commentCount: '50' },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.hype).toBe(0.15);
    });

    it('should return 0 when comments are disabled', () => {
      const raw = buildRawVideo({
        statistics: { viewCount: '1000', likeCount: '100' },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.hype).toBe(0);
    });

    it('should return 0 when views are 0', () => {
      const raw = buildRawVideo({
        statistics: { viewCount: '0', likeCount: '0', commentCount: '0' },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.hype).toBe(0);
    });

    it('should multiply hype by 2 when title contains Tutorial', () => {
      const raw = buildRawVideo({
        snippet: {
          title: 'AWS Tutorial',
          channelTitle: 'JuniorDev99',
          publishedAt: new Date().toISOString(),
          thumbnails: { high: { url: 'https://via.placeholder.com/300x200' } },
        },
        statistics: { viewCount: '1000', likeCount: '100', commentCount: '50' },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.hype).toBe(0.3);
    });

    it('should multiply hype by 2 when title contains tutorial in any case', () => {
      const raw = buildRawVideo({
        snippet: {
          title: 'AWS tUtOrIaL avanzado',
          channelTitle: 'JuniorDev99',
          publishedAt: new Date().toISOString(),
          thumbnails: { high: { url: 'https://via.placeholder.com/300x200' } },
        },
        statistics: { viewCount: '1000', likeCount: '100', commentCount: '50' },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.hype).toBe(0.3);
    });
  });

  describe('getRelativeTime', () => {
    it('should return minutes when published less than 1 hour ago', () => {
      const date = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const raw = buildRawVideo({
        snippet: {
          title: 'Test',
          channelTitle: 'Test',
          publishedAt: date,
          thumbnails: { high: { url: '' } },
        },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.publishedAt).toMatch(/^Hace \d+ minutos?$/);
    });

    it('should return hours when published less than 1 day ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
      const raw = buildRawVideo({
        snippet: {
          title: 'Test',
          channelTitle: 'Test',
          publishedAt: date,
          thumbnails: { high: { url: '' } },
        },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.publishedAt).toMatch(/^Hace \d+ horas?$/);
    });

    it('should return days when published less than 1 month ago', () => {
      const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
      const raw = buildRawVideo({
        snippet: {
          title: 'Test',
          channelTitle: 'Test',
          publishedAt: date,
          thumbnails: { high: { url: '' } },
        },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.publishedAt).toMatch(/^Hace \d+ días?$/);
    });

    it('should return months when published less than 1 year ago', () => {
      const date = new Date(
        Date.now() - 60 * 24 * 60 * 60 * 1000,
      ).toISOString();
      const raw = buildRawVideo({
        snippet: {
          title: 'Test',
          channelTitle: 'Test',
          publishedAt: date,
          thumbnails: { high: { url: '' } },
        },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.publishedAt).toMatch(/^Hace \d+ meses?$/);
    });

    it('should return years when published more than 1 year ago', () => {
      const date = new Date(
        Date.now() - 400 * 24 * 60 * 60 * 1000,
      ).toISOString();
      const raw = buildRawVideo({
        snippet: {
          title: 'Test',
          channelTitle: 'Test',
          publishedAt: date,
          thumbnails: { high: { url: '' } },
        },
      });
      const video = YoutubeMapper.toDomain(raw);
      expect(video.publishedAt).toMatch(/^Hace \d+ años?$/);
    });
  });
});
