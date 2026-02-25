import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoGrid from './VideoGrid';

const mockVideos = [
  {
    id: 'vid_001',
    thumbnail: 'https://placehold.co/300x200',
    thumbnailAlt: 'https://placehold.co/300x200/alt',
    title: 'AWS explicado fácil',
    author: 'JuniorDev99',
    publishedAt: 'Hace 2 meses',
    hype: 0.5,
  },
  {
    id: 'vid_002',
    thumbnail: 'https://placehold.co/300x200',
    thumbnailAlt: 'https://placehold.co/300x200/alt',
    title: 'Redux explicado fácil',
    author: 'MidudevFan',
    publishedAt: 'Hace 1 año',
    hype: 0.3,
  },
  {
    id: 'vid_003',
    thumbnail: 'https://placehold.co/300x200',
    thumbnailAlt: 'https://placehold.co/300x200/alt',
    title: 'TypeScript tips',
    author: 'TechGuru',
    publishedAt: 'Hace 3 meses',
    hype: 0.2,
  },
];

describe('VideoGrid', () => {
  it('should render the section title', () => {
    render(<VideoGrid videos={mockVideos} />);
    expect(screen.getByText(/Cartelera de Conocimiento/i)).toBeInTheDocument();
  });

  it('should render all video cards', () => {
    render(<VideoGrid videos={mockVideos} />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(mockVideos.length);
  });

  it('should render each video title', () => {
    render(<VideoGrid videos={mockVideos} />);
    expect(screen.getByText('Aws explicado fácil')).toBeInTheDocument();
    expect(screen.getByText('Redux explicado fácil')).toBeInTheDocument();
    expect(screen.getByText('Typescript tips')).toBeInTheDocument();
  });

  it('should render empty grid when no videos', () => {
    render(<VideoGrid videos={[]} />);
    const cards = screen.queryAllByRole('article');
    expect(cards).toHaveLength(0);
  });

  it('should render a single video card', () => {
    render(<VideoGrid videos={[mockVideos[0]]} />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(1);
  });
});