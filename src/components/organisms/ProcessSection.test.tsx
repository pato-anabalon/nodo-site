import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { ProcessSection } from './ProcessSection';

describe('ProcessSection', () => {
  it('should render process steps without the desktop video by default', () => {
    renderWithProviders(<ProcessSection />);

    expect(screen.getByRole('heading', { name: /a clear path/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(0);
    expect(screen.queryByTestId('home-process-video')).not.toBeInTheDocument();
  });
});
