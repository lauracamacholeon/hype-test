import type { CrownVideoProps } from '@/shared/types';
import styles from './CrownVideo.module.scss';

const CrownVideo = ({ video }: CrownVideoProps) => {
  return (
    <article className={styles.crown}>
      <div className={styles.badge}>
        <span className={styles.icon}>👑</span>
        <span className={styles.textBadge}>Joya de la Corona</span>
      </div>
      <div className={styles.inner}>
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
          <h2 className={styles.title}>{video.title}</h2>
          <p className={styles.author}>{video.author}</p>
          <p className={styles.date}>{video.publishedAt}</p>
          <p className={styles.description}>
            Este video tiene el mayor nivel de hype de la cartelera. 🔥
          </p>
        </div>
      </div>
    </article>
  );
};

export default CrownVideo;