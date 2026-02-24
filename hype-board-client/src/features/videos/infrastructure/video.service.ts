import type { Video } from "../domain/video.model";

const API_URL = "http://localhost:3000/api/videos";

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.status}`);
  }

  return response.json();
};
