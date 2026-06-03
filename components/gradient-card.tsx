import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type GradientCardProps = {
  title: ReactNode;
  description?: ReactNode;
  accent: string;
  badge?: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  children?: ReactNode;
};

export function GradientCard({
  title,
  description,
  accent,
  badge,
  href,
  external,
  className,
  children,
}: GradientCardProps) {
  const content = (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b ${accent} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative flex h-full flex-col">
        {badge ? <div className="mb-4">{badge}</div> : null}
        <div
          className={`mb-4 h-1.5 w-14 rounded-full bg-gradient-to-r ${accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
        />
        <h3 className="text-xl font-semibold tracking-[-0.01em] text-zinc-900 transition-colors duration-300 group-hover:text-white dark:text-zinc-100">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 text-sm leading-5 text-zinc-500 transition-colors duration-300 group-hover:text-white/90 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
        {children ? <div className="relative mt-auto pt-4">{children}</div> : null}
      </div>
    </>
  );

  const classNames = cn(
    'group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition duration-300 sm:min-h-[240px] sm:p-6 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:bg-zinc-900',
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }

  return <div className={classNames}>{content}</div>;
}
