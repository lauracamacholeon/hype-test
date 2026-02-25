import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render the loading text', () => {
    render(<Spinner />);
    expect(screen.getByText('Cargando videos...')).toBeInTheDocument();
  });

  it('should render the spinner element', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('._spinner_8ac754');
    expect(spinner).toBeDefined();
  });

  it('should render the wrapper element', () => {
    const { container } = render(<Spinner />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });
});