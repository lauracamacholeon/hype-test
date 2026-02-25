import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchVideos } from "./video.service";

const mockVideos = [
  {
    id: "vid_001",
    thumbnail: "https://placehold.co/300x200",
    thumbnailAlt: "https://placehold.co/300x200",
    title: "AWS explicado fácil",
    author: "JuniorDev99",
    publishedAt: "Hace 2 meses",
    hype: 0.05,
  },
];

describe("fetchVideos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return videos when response is ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockVideos,
    });

    const videos = await fetchVideos();
    expect(videos).toEqual(mockVideos);
  });

  it("should throw 429 message when rate limit is exceeded", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
    });

    await expect(fetchVideos()).rejects.toThrow(
      "Has superado el límite de peticiones. Intenta de nuevo en un momento."
    );
  });

  it("should throw 500 message when server error occurs", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchVideos()).rejects.toThrow(
      "Error interno del servidor. Intenta de nuevo más tarde."
    );
  });

  it("should throw generic message for unknown errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 418,
    });

    await expect(fetchVideos()).rejects.toThrow("Error inesperado: 418");
  });
});
