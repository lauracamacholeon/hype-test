import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CrownVideo from './CrownVideo';

const mockVideo = {
  id: 'vid_001',
  thumbnail: 'https://placehold.co/300x200',
  thumbnailAlt: 'https://placehold.co/300x200/alt',
  title: 'AWS explicado fácil',
  author: 'JuniorDev99',
  publishedAt: 'Hace 2 meses',
  hype: 0.5,
};

describe('CrownVideo', () => {
  it('should render the crown badge', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(screen.getByText('Joya de la Corona')).toBeInTheDocument();
  });

  it('should render the video title', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(screen.getByText('AWS explicado fácil')).toBeInTheDocument();
  });

  it('should render the video author', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(screen.getByText('JuniorDev99')).toBeInTheDocument();
  });

  it('should render the published date', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(screen.getByText('Hace 2 meses')).toBeInTheDocument();
  });

  it('should render the hype level', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(screen.getByText(/0.500/)).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<CrownVideo video={mockVideo} />);
    expect(
      screen.getByText(/Este video tiene el mayor nivel de hype/i),
    ).toBeInTheDocument();
  });

  it('should render the thumbnail with correct alt', () => {
    render(<CrownVideo video={mockVideo} />);
    const img = screen.getByAltText('AWS explicado fácil');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockVideo.thumbnail);
  });

  it('should fallback to thumbnailAlt when thumbnail fails', () => {
    render(<CrownVideo video={mockVideo} />);
    const img = screen.getByAltText('AWS explicado fácil');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', mockVideo.thumbnailAlt);
  });
});