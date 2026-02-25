import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render the error title', () => {
    render(<ErrorMessage message="Error de prueba" />);
    expect(screen.getByText('UPS Algo salio mal...!!!')).toBeInTheDocument();
  });

  it('should render the error message', () => {
    render(<ErrorMessage message="Error de prueba" />);
    expect(screen.getByText('Error de prueba')).toBeInTheDocument();
  });

  it('should render the warning icon', () => {
    render(<ErrorMessage message="Error de prueba" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('should render the 429 rate limit message', () => {
    render(
      <ErrorMessage message="Has superado el límite de peticiones. Intenta de nuevo en un momento." />,
    );
    expect(
      screen.getByText('Has superado el límite de peticiones. Intenta de nuevo en un momento.'),
    ).toBeInTheDocument();
  });

  it('should render the 500 server error message', () => {
    render(
      <ErrorMessage message="Error interno del servidor. Intenta de nuevo más tarde." />,
    );
    expect(
      screen.getByText('Error interno del servidor. Intenta de nuevo más tarde.'),
    ).toBeInTheDocument();
  });

  it('should render generic error message', () => {
    render(<ErrorMessage message="Error inesperado: 418" />);
    expect(screen.getByText('Error inesperado: 418')).toBeInTheDocument();
  });
});