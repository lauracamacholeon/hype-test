import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useVideos } from "./useVideos.hook";
import * as videoService from "../infrastructure/video.service";

const mockVideos = [
  {
    id: "vid_001",
    thumbnail: "https://placehold.co/300x200",
    thumbnailAlt: "https://placehold.co/300x200",
    title: "AWS explicado fácil",
    author: "JuniorDev99",
    publishedAt: "Hace 2 meses",
    hype: 0.5,
  },
  {
    id: "vid_002",
    thumbnail: "https://placehold.co/300x200",
    thumbnailAlt: "https://placehold.co/300x200",
    title: "Redux explicado fácil",
    author: "MidudevFan",
    publishedAt: "Hace 1 año",
    hype: 0.3,
  },
];

describe("useVideos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should start with loading state", () => {
    vi.spyOn(videoService, "fetchVideos").mockResolvedValue(mockVideos);
    const { result } = renderHook(() => useVideos());
    expect(result.current.isLoading).toBe(true);
  });

  it("should set crownVideo as first video and rest as videos", async () => {
    vi.spyOn(videoService, "fetchVideos").mockResolvedValue(mockVideos);
    const { result } = renderHook(() => useVideos());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.crownVideo).toEqual(mockVideos[0]);
    expect(result.current.videos).toEqual(mockVideos.slice(1));
  });

  it("should set error when fetch fails", async () => {
    vi.spyOn(videoService, "fetchVideos").mockRejectedValue(
      new Error(
        "Has superado el límite de peticiones. Intenta de nuevo en un momento."
      )
    );

    const { result } = renderHook(() => useVideos());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(
      "Has superado el límite de peticiones. Intenta de nuevo en un momento."
    );
    expect(result.current.crownVideo).toBeNull();
    expect(result.current.videos).toEqual([]);
  });

  it("should set loading to false after fetch completes", async () => {
    vi.spyOn(videoService, "fetchVideos").mockResolvedValue(mockVideos);
    const { result } = renderHook(() => useVideos());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isLoading).toBe(false);
  });
});
