'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';

export function SidebarThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const value = mounted ? resolvedTheme : null;

  return (
    <button
      type="button"
      className={cn('inline-flex items-center rounded-full border p-1', className)}
      aria-label="Toggle Theme"
      onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
      data-theme-toggle=""
    >
      <Sun
        fill="currentColor"
        className={cn('size-6.5 rounded-full p-1.5 text-fd-muted-foreground', value === 'light' && 'bg-fd-accent text-fd-accent-foreground')}
      />
      <Moon
        fill="currentColor"
        className={cn('size-6.5 rounded-full p-1.5 text-fd-muted-foreground', value === 'dark' && 'bg-fd-accent text-fd-accent-foreground')}
      />
    </button>
  );
}
