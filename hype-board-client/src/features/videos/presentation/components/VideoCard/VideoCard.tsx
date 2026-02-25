import type { VideoCardProps } from '@/shared/types';
import { capitalize } from '@/shared/utils/string.utils';
import styles from './VideoCard.module.scss';

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnail}>
        <img
          src={video.thumbnail}
          alt={video.title}
          onError={(e) => {
            e.currentTarget.src = video.thumbnailAlt;
          }}
        />
        <span className={styles.hype}>⚡ {video.hype.toFixed(3)}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{capitalize(video.title)}</h3>
        <p className={styles.author}>{capitalize(video.author)}</p>
        <p className={styles.date}>{video.publishedAt}</p>
      </div>
    </article>
  );
};

export default VideoCard;