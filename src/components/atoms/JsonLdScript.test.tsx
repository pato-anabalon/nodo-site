import { renderWithProviders } from '@/test/render';
import { JsonLdScript } from './JsonLdScript';

describe('JsonLdScript', () => {
  it('should render escaped structured data', () => {
    const { container } = renderWithProviders(<JsonLdScript id="test-json" data={{ name: '<Nodo>' }} />);

    const script = container.querySelector('#test-json');

    expect(script).toHaveAttribute('type', 'application/ld+json');
    expect(script?.innerHTML).toContain('\\u003cNodo>');
  });
});
