import type { Video } from "@/shared/types";

const API_URL = import.meta.env.VITE_API_URL as string;

const ERROR_MESSAGES: Record<number, string> = {
  429: "Has superado el límite de peticiones. Intenta de nuevo en un momento.",
  500: "Error interno del servidor. Intenta de nuevo más tarde.",
  503: "Servicio no disponible. Intenta de nuevo más tarde.",
};

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const message =
      ERROR_MESSAGES[response.status] ?? `Error inesperado: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};
