import { screen } from '@testing-library/react';
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

  it('should render the proof section with case study CTA', () => {
    renderWithProviders(<HomeProofSection />);

    expect(screen.getByRole('heading', { name: /outdated wix to a high-trust/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view the case study/i })).toHaveAttribute('href', '/case-studies');
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
