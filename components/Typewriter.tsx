'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';

const MIN_DURATION_SECONDS = 0.9;
const MAX_DURATION_SECONDS = 3.2;
const PER_LINE_SECONDS = 0.65;

function getDuration(lines: number) {
  const duration = Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, lines * PER_LINE_SECONDS));
  return `${duration.toFixed(2)}s`;
}

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState(1);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const updateLines = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.height) return;
      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight);
      const fallbackLineHeight = parseFloat(computed.fontSize) * 1.2;
      const realLineHeight = Number.isFinite(lineHeight) ? lineHeight : fallbackLineHeight;
      const nextLines = Math.max(1, Math.round(rect.height / realLineHeight));
      setLines((prev) => (prev === nextLines ? prev : nextLines));
    };

    updateLines();
    const observer = new ResizeObserver(updateLines);
    observer.observe(el);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateLines);
    void document.fonts?.ready.then(updateLines);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateLines);
    };
  }, [text]);

  const style = useMemo(
    () =>
      ({
        '--tw-typewriter-lines': lines,
        '--tw-typewriter-duration': getDuration(lines),
      }) as CSSProperties,
    [lines]
  );

  return (
    <span ref={containerRef} className={cn('typewriter', className)} style={style}>
      <span ref={textRef} className="typewriter__text">
        {text}
      </span>
    </span>
  );
}
