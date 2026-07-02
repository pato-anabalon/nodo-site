import { renderWithProviders } from '@/test/render';
import { ConstellationBackground } from './ConstellationBackground';

describe('ConstellationBackground', () => {
  it('should render a decorative canvas', () => {
    const { container } = renderWithProviders(<ConstellationBackground interactive={false} />);

    const canvas = container.querySelector('canvas');

    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });
});
