'use client';

import { useLayoutEffect, useRef, useState } from 'react';

const MIN_FONT_SIZE = 36;
const SAFE_FIT_RATIO = 0.985;
const MEASURE_FONT_SIZE = 100;

export function FooterWordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(180);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measureEl = measureRef.current;
    if (!container || !measureEl) return;

    const updateFontSize = () => {
      measureEl.style.fontSize = `${MEASURE_FONT_SIZE}px`;
      const measuredWidth = measureEl.getBoundingClientRect().width;
      if (!measuredWidth) return;

      const targetWidth = container.clientWidth * SAFE_FIT_RATIO;
      const unitWidth = measuredWidth / MEASURE_FONT_SIZE;
      if (!unitWidth) return;
      const scaledFontSize = targetWidth / unitWidth;
      const clampedFontSize = Math.max(MIN_FONT_SIZE, scaledFontSize);
      setFontSize(clampedFontSize);
    };

    updateFontSize();
    const observer = new ResizeObserver(updateFontSize);
    observer.observe(container);
    document.fonts?.ready.then(updateFontSize).catch(() => {});
    window.addEventListener('resize', updateFontSize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-7 text-left sm:py-9 md:py-10">
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 inline-block whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.03em] opacity-0"
      >
        {text}
      </span>
      <p
        ref={textRef}
        className="block select-none whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.03em] text-zinc-900 dark:text-zinc-100"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </p>
    </div>
  );
}
