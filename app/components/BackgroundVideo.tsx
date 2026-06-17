'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  poster?: string;
  src: string;
};

export default function BackgroundVideo({ className, poster, src }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Force muted before play() — some browsers (Firefox, mobile) won't honour
    // the autoplay attribute on its own and need an explicit, muted play call.
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
