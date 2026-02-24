export interface ErrorMessageProps {
  message: string;
}

export interface Video {
  id: string;
  thumbnail: string;
  thumbnailAlt: string;
  title: string;
  author: string;
  publishedAt: string;
  hype: number;
}

export interface VideoCardProps {
  video: Video;
}

export interface CrownVideoProps {
  video: Video;
}

export interface VideoGridProps {
  videos: Video[];
}
