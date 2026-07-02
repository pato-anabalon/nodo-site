import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { Container } from './Container';

describe('Container', () => {
  it('should render children', () => {
    renderWithProviders(
      <Container>
        <p>Inside container</p>
      </Container>
    );

    expect(screen.getByText('Inside container')).toBeInTheDocument();
  });
});
