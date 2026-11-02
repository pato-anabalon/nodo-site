import { screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { NodoLogoImage } from './NodoLogoImage';

describe('NodoLogoImage', () => {
  it('should render the transparent brand logo', async () => {
    const view = renderWithProviders(<NodoLogoImage />);

    expect(screen.getByAltText('Nodo')).toHaveAttribute('src', expect.stringContaining('nodo-logo-transparent'));
    await expectNoA11yViolations(view);
  });
});
