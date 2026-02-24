import { useVideos } from '@/features/videos/application/useVideos.hook';
import CrownVideo from '../components/CrownVideo/CrownVideo';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import Spinner from '@/shared/components/Spinner/Spinner';
import ErrorMessage from '@/shared/components/ErrorMessage/ErrorMessage';
import styles from './VideosPage.module.scss';

const VideosPage = () => {
  const { videos, crownVideo, isLoading, error } = useVideos();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>🔥 Hype Board</h1>
        <p className={styles.subheading}>
          Los videos más populares de la comunidad dev
        </p>
      </header>

      {crownVideo && <CrownVideo video={crownVideo} />}

      <VideoGrid videos={videos} />
    </main>
  );
};

export default VideosPage;