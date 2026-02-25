import { useVideos } from '@/features/videos/application/useVideos.hook';
import CrownVideo from '../components/CrownVideo/CrownVideo';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import Spinner from '@/shared/components/Spinner/Spinner';
import ErrorMessage from '@/shared/components/ErrorMessage/ErrorMessage';
import Footer from '@/shared/components/Footer/Footer';
import styles from './VideosPage.module.scss';
import logo from '@/assets/sundevs.svg';

const VideosPage = () => {
  const { videos, crownVideo, isLoading, error } = useVideos();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <img src={logo} alt="SunDevs Logo" className={styles.logo} />
        <h1 className={styles.subheading}>
          Los videos más populares de la comunidad dev
        </h1>
      </header>

      {crownVideo && <CrownVideo video={crownVideo} />}

      <VideoGrid videos={videos} />
      <Footer />
    </main>
  );
};

export default VideosPage;