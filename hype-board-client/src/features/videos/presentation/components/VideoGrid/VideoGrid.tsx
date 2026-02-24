import type { VideoGridProps } from '@/shared/types';
import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoGrid.module.scss';

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>📺 Cartelera de Conocimiento</h2>
      <div className={styles.grid}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default VideoGrid;