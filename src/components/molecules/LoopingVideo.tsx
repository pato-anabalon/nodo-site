'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type LoopingVideoProps = {
  src: string;
  label: string;
  className?: string;
  dataTestId?: string;
  onLoadedMetadata?: () => void;
};

function playVideo(video: HTMLVideoElement, onBlocked: () => void) {
  // Older browsers and test environments return undefined instead of a promise.
  video.play()?.catch(onBlocked);
}

export function LoopingVideo({ src, label, className, dataTestId, onLoadedMetadata }: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    playVideo(video, () => setIsPlaying(false));
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      playVideo(video, () => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        src={`${src}#t=0.1`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        data-testid={dataTestId}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={onLoadedMetadata}
      />
      <button
        type="button"
        aria-label={isPlaying ? `Pause video: ${label}` : `Play video: ${label}`}
        data-testid={dataTestId ? `${dataTestId}-toggle` : undefined}
        className="absolute bottom-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/16 bg-nodo-black/70 text-white backdrop-blur-sm transition duration-200 hover:bg-nodo-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nodo-lavender"
        onClick={togglePlayback}
      >
        {isPlaying ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      </button>
    </>
  );
}
