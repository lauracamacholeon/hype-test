import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideosPage from './VideosPage';
import * as useVideosHook from '@/features/videos/application/useVideos.hook';

const mockVideos = [
  {
    id: 'vid_001',
    thumbnail: 'https://placehold.co/300x200',
    thumbnailAlt: 'https://placehold.co/300x200',
    title: 'AWS explicado fácil',
    author: 'JuniorDev99',
    publishedAt: 'Hace 2 meses',
    hype: 0.5,
  },
  {
    id: 'vid_002',
    thumbnail: 'https://placehold.co/300x200',
    thumbnailAlt: 'https://placehold.co/300x200',
    title: 'Redux explicado fácil',
    author: 'MidudevFan',
    publishedAt: 'Hace 1 año',
    hype: 0.3,
  },
];

describe('VideosPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should show spinner when loading', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: [],
      crownVideo: null,
      isLoading: true,
      error: null,
    });

    render(<VideosPage />);
    expect(screen.getByText(/Cargando videos/i)).toBeInTheDocument();
  });

  it('should show error message when fetch fails', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: [],
      crownVideo: null,
      isLoading: false,
      error: 'Has superado el límite de peticiones. Intenta de nuevo en un momento.',
    });

    render(<VideosPage />);
    expect(screen.getByText(/UPS Algo salio mal/i)).toBeInTheDocument();
    expect(
      screen.getByText('Has superado el límite de peticiones. Intenta de nuevo en un momento.'),
    ).toBeInTheDocument();
  });

  it('should show crown video when data loads', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: mockVideos.slice(1),
      crownVideo: mockVideos[0],
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    expect(screen.getByText('Joya de la Corona')).toBeInTheDocument();
  });

  it('should show video grid when data loads', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: mockVideos.slice(1),
      crownVideo: mockVideos[0],
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    expect(screen.getByText(/Cartelera de Conocimiento/i)).toBeInTheDocument();
  });

  it('should show logo', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: mockVideos.slice(1),
      crownVideo: mockVideos[0],
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    const logos = screen.getAllByAltText('SunDevs Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('should not show crown video when crownVideo is null', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: [],
      crownVideo: null,
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    expect(screen.queryByText('Joya de la Corona')).not.toBeInTheDocument();
  });

  it('should show subheading', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: mockVideos.slice(1),
      crownVideo: mockVideos[0],
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    expect(
      screen.getByText(/Los videos más populares de la comunidad dev/i),
    ).toBeInTheDocument();
  });

  it('should show footer', () => {
    vi.spyOn(useVideosHook, 'useVideos').mockReturnValue({
      videos: mockVideos.slice(1),
      crownVideo: mockVideos[0],
      isLoading: false,
      error: null,
    });

    render(<VideosPage />);
    expect(screen.getByText(/SunDevs · Hype Board/i)).toBeInTheDocument();
  });
});