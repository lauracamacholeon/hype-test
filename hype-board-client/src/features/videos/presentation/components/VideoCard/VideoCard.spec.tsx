import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCard from './VideoCard';

const mockVideo = {
  id: 'vid_001',
  thumbnail: 'https://placehold.co/300x200',
  thumbnailAlt: 'https://placehold.co/300x200/alt',
  title: 'AWS explicado fácil',
  author: 'JuniorDev99',
  publishedAt: 'Hace 2 meses',
  hype: 0.5,
};

describe('VideoCard', () => {
  it('should render the video title capitalized', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText('Aws explicado fácil')).toBeInTheDocument();
  });

  it('should render the video author capitalized', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText('Juniordev99')).toBeInTheDocument();
  });

  it('should render the published date', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText('Hace 2 meses')).toBeInTheDocument();
  });

  it('should render the hype level', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(/0.500/)).toBeInTheDocument();
  });

  it('should render the thumbnail with correct alt', () => {
    render(<VideoCard video={mockVideo} />);
    const img = screen.getByAltText('AWS explicado fácil');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockVideo.thumbnail);
  });

  it('should fallback to thumbnailAlt when thumbnail fails', () => {
    render(<VideoCard video={mockVideo} />);
    const img = screen.getByAltText('AWS explicado fácil');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', mockVideo.thumbnailAlt);
  });

  it('should render mixed case title capitalized', () => {
    render(
      <VideoCard
        video={{ ...mockVideo, title: 'tUtOrIaL de React' }}
      />,
    );
    expect(screen.getByText('Tutorial de react')).toBeInTheDocument();
  });

  it('should render mixed case author capitalized', () => {
    render(
      <VideoCard
        video={{ ...mockVideo, author: 'mIdUdEvFaN' }}
      />,
    );
    expect(screen.getByText('Midudevfan')).toBeInTheDocument();
  });
});