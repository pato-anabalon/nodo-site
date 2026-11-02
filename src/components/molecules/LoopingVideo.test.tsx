import { fireEvent, screen } from '@testing-library/react';
import { expectNoA11yViolations } from '@/test/a11y';
import { renderWithProviders } from '@/test/render';
import { LoopingVideo } from './LoopingVideo';

describe('LoopingVideo', () => {
  it('should render a muted loop without autoplay and a labelled toggle', async () => {
    const view = renderWithProviders(
      <LoopingVideo src="/videos/how-we-work.mp4" label="Sketching a wireframe" dataTestId="video" />
    );

    const video = screen.getByTestId('video') as HTMLVideoElement;
    expect(video).not.toHaveAttribute('autoplay');
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(screen.getByRole('button', { name: 'Play video: Sketching a wireframe' })).toBeInTheDocument();
    await expectNoA11yViolations(view);
  }, 15000);

  it('should switch the toggle label when the video plays', () => {
    renderWithProviders(
      <LoopingVideo src="/videos/how-we-work.mp4" label="Sketching a wireframe" dataTestId="video" />
    );

    fireEvent.play(screen.getByTestId('video'));

    expect(screen.getByRole('button', { name: 'Pause video: Sketching a wireframe' })).toBeInTheDocument();
  });
});
