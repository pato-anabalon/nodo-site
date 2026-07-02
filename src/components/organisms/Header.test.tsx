import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { renderWithProviders } from '@/test/render';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/plans');
  });

  it('should render desktop and mobile navigation', () => {
    renderWithProviders(<Header />);

    expect(screen.getAllByRole('link', { name: /nodo home/i })).toHaveLength(2);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let.s talk/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /^about us$/i })).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('site-header-mobile-menu-link-about-us')).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('site-header-desktop-plans-link')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('site-header-plans-dropdown-website-plans')).toHaveAttribute('href', '/plans/websites');
    expect(screen.getByTestId('site-header-plans-dropdown-marketing-branding')).toHaveAttribute(
      'href',
      '/plans/marketing-branding'
    );
  });

  it('should mark desktop home as active on the homepage', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    renderWithProviders(<Header />);

    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('should mark About Us as active on the about page', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');

    renderWithProviders(<Header />);

    expect(screen.getAllByRole('link', { name: /^about us$/i })[0]).toHaveAttribute('aria-current', 'page');
  });

  it('should open and close the mobile menu', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    await user.click(menuButton);
    expect(screen.getByTestId('site-header-mobile-menu-button')).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(screen.getByTestId('site-header-mobile-menu-button')).toHaveAttribute('aria-expanded', 'false');
  });
});
