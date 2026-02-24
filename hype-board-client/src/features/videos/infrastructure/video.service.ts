import type { Video } from "../domain/video.model";

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.status}`);
  }

  return response.json();
};
