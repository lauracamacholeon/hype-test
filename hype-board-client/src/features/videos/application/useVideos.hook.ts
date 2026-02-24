import { useState, useEffect } from "react";
import type { Video } from "@/shared/types";
import { fetchVideos } from "../infrastructure/video.service";

interface UseVideosState {
  videos: Video[];
  crownVideo: Video | null;
  isLoading: boolean;
  error: string | null;
}

export const useVideos = (): UseVideosState => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [crownVideo, setCrownVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchVideos();
        setCrownVideo(data[0]);
        setVideos(data.slice(1));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    void loadVideos();
  }, []);

  return { videos, crownVideo, isLoading, error };
};
