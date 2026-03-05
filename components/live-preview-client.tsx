'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function LivePreviewClient() {
  const router = useRouter();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const source = new EventSource('/api/live-preview');
    const refresh = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        router.refresh();
      }, 120);
    };

    source.addEventListener('change', refresh);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      source.removeEventListener('change', refresh);
      source.close();
    };
  }, [router]);

  return null;
}
