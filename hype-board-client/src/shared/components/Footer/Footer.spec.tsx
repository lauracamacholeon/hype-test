import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render the logo', () => {
    render(<Footer />);
    expect(screen.getByAltText('SunDevs Logo')).toBeInTheDocument();
  });

  it('should render the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it('should render the company name', () => {
    render(<Footer />);
    expect(screen.getByText(/SunDevs/i)).toBeInTheDocument();
  });

  it('should render the app name', () => {
    render(<Footer />);
    expect(screen.getByText(/Hype Board/i)).toBeInTheDocument();
  });

  it('should render the copyright symbol', () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});