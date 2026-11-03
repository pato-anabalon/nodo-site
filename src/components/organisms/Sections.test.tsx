import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { AboutSection } from './AboutSection';
import { CTASection } from './CTASection';
import { HomeProofSection } from './HomeProofSection';
import { ResultsSection } from './ResultsSection';
import { ServicesSection } from './ServicesSection';

describe('home section organisms', () => {
  it('should render the services section', () => {
    renderWithProviders(<ServicesSection />);

    expect(screen.getByRole('heading', { name: /three services, one direction/i })).toBeInTheDocument();
    expect(screen.getByTestId('home-services-card-grid')).toBeInTheDocument();
    expect(screen.getByTestId('home-service-card-branding')).toBeInTheDocument();
  });

  it('should render the case study carousel with every case and a linked CTA', () => {
    renderWithProviders(<HomeProofSection />);

    expect(screen.getByRole('region', { name: 'Featured case studies' })).toHaveAttribute(
      'aria-roledescription',
      'carousel'
    );
    expect(screen.getByRole('heading', { name: /real work for real auckland businesses/i })).toBeInTheDocument();
    expect(screen.getByTestId('home-proof-slide-title')).toHaveTextContent(
      'From outdated Wix to a high-trust trade site.'
    );
    expect(screen.getByRole('link', { name: /view the case study/i })).toHaveAttribute(
      'href',
      '/case-studies#plasterpro'
    );
    ['plasterpro', 'liberty-security', 'old-brush'].forEach((id) => {
      expect(screen.getByTestId(`home-proof-slide-${id}`)).toBeInTheDocument();
    });
  });

  it('should move to the next case study from the controls', async () => {
    renderWithProviders(<HomeProofSection />);

    fireEvent.click(screen.getByRole('button', { name: 'Next case study' }));

    expect(await screen.findByText('From a strategy document to a launch-ready site.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view the case study/i })).toHaveAttribute(
      'href',
      '/case-studies#liberty-security'
    );
    expect(screen.getByRole('button', { name: /show case study 2: liberty security/i })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  it('should render the results section', () => {
    renderWithProviders(<ResultsSection />);

    expect(screen.getByRole('heading', { name: /what changes for your customers/i })).toBeInTheDocument();
  });

  it('should render the about section', () => {
    renderWithProviders(<AboutSection />);

    expect(screen.getByRole('heading', { name: /auckland partner/i })).toBeInTheDocument();
    expect(screen.getByTestId('home-about-video')).toHaveAttribute(
      'src',
      expect.stringContaining('/videos/team-discussion-optimized.mp4')
    );
  });

  it('should render the final CTA section', () => {
    renderWithProviders(<CTASection />);

    expect(screen.getByRole('heading', { name: /easier to choose/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start the conversation/i })).toHaveAttribute(
      'href',
      '/contact?source=home-cta'
    );
    expect(screen.getByRole('link', { name: /see plans/i })).toHaveAttribute('href', '/plans');
    expect(screen.getByTestId('home-cta-reassurance')).toHaveTextContent('We reply within one business day.');
  });
});
