import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import { AboutPage } from './AboutPage';
import { CaseStudiesPage } from './CaseStudiesPage';
import { LandingPage } from './LandingPage';
import { MarketingBrandingPlansPage } from './MarketingBrandingPlansPage';
import { PlansHubPage } from './PlansHubPage';
import { ServicesPage } from './ServicesPage';
import { WebsiteDesignAucklandPage } from './WebsiteDesignAucklandPage';
import { WebsitePlansPage } from './WebsitePlansPage';

describe('page templates', () => {
  beforeEach(() => {
    document.documentElement.dataset.nodoPreloaded = 'true';
  });

  it('should render LandingPage', () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByTestId('home-page-main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('nodo');
  });

  it('should render ServicesPage', () => {
    renderWithProviders(<ServicesPage />);

    expect(screen.getByTestId('services-page-main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render PlansHubPage', () => {
    renderWithProviders(<PlansHubPage />);

    expect(screen.getByTestId('plans-page-main')).toBeInTheDocument();
    expect(screen.getByTestId('plans-hub-card-grid')).toBeInTheDocument();
  });

  it('should render WebsitePlansPage', () => {
    renderWithProviders(<WebsitePlansPage />);

    expect(screen.getByTestId('plans-page-main')).toBeInTheDocument();
    expect(screen.getByTestId('plans-grid')).toBeInTheDocument();
    expect(screen.getByTestId('plans-launch-card')).toBeInTheDocument();
    expect(screen.getByTestId('plans-page-cadence-section')).toBeInTheDocument();
    expect(screen.getByTestId('plans-page-cadence-grid')).toBeInTheDocument();
    expect(screen.getAllByText('First 90 days')).toHaveLength(3);
    expect(screen.getAllByText('Monthly cadence')).toHaveLength(3);
    expect(screen.getAllByText('What gets reported')).toHaveLength(3);
    expect(screen.getAllByText('What improves over time')).toHaveLength(3);
    expect(screen.getByText('Launch sprint')).toBeInTheDocument();
    expect(screen.getByText('Go-live handover')).toBeInTheDocument();
    expect(screen.getByText('What gets delivered')).toBeInTheDocument();
    expect(screen.getByText('What can improve next')).toBeInTheDocument();
  });

  it('should render MarketingBrandingPlansPage', () => {
    renderWithProviders(<MarketingBrandingPlansPage />);

    expect(screen.getByTestId('marketing-branding-plans-page-main')).toBeInTheDocument();
    expect(screen.getByTestId('marketing-plans-section')).toBeInTheDocument();
    expect(screen.getByTestId('branding-plans-section')).toBeInTheDocument();
  });

  it('should render WebsiteDesignAucklandPage', () => {
    renderWithProviders(<WebsiteDesignAucklandPage />);

    expect(screen.getByTestId('website-design-auckland-page-main')).toBeInTheDocument();
    expect(screen.getByTestId('website-design-auckland-faq-section')).toBeInTheDocument();
  });

  it('should render CaseStudiesPage', () => {
    renderWithProviders(<CaseStudiesPage />);

    expect(screen.getByTestId('case-studies-page-main')).toBeInTheDocument();
    expect(screen.getAllByText(/PlasterPro Solution/i).length).toBeGreaterThan(0);
  });

  it('should render AboutPage', () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByTestId('about-page-main')).toBeInTheDocument();
    expect(screen.getByTestId('about-hero-heading')).toHaveTextContent('Connecting businesses, people and ideas.');
    expect(screen.getByTestId('about-values-signal-stage')).toBeInTheDocument();
    expect(
      screen.getByTestId('about-values-section').compareDocumentPosition(screen.getByTestId('about-services-section'))
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByTestId('about-value-speed')).toBeInTheDocument();
    expect(screen.getByTestId('about-value-results')).toBeInTheDocument();
    expect(screen.getByTestId('about-clients-focus-loop')).toBeInTheDocument();
    expect(screen.getByTestId('about-client-emerging-brands-and-growing-businesses')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByTestId('about-client-panel-emerging-brands-and-growing-businesses')).toHaveTextContent(
      'systems ready to grow with you'
    );
    fireEvent.click(screen.getByTestId('about-client-construction-companies'));
    expect(screen.getByTestId('about-client-construction-companies')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('about-client-panel-construction-companies')).toHaveTextContent(
      'residential and commercial enquiries'
    );
    expect(screen.queryByTestId('about-client-panel-emerging-brands-and-growing-businesses')).not.toBeInTheDocument();
    expect(screen.getByTestId('about-final-primary-button')).toHaveAttribute('href', '/contact?source=about-final');
  });
});
