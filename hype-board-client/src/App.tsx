import { Suspense, lazy } from 'react';
import Spinner from '@/shared/components/Spinner/Spinner';

const VideosPage = lazy(
  () => import('@/features/videos/presentation/pages/VideosPage'),
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <VideosPage />
    </Suspense>
  );
}

export default App;