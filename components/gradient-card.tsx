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
  minimal?: boolean;
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
  minimal = false,
}: GradientCardProps) {
  const hoverDirection = minimal ? 'bg-gradient-to-r' : 'bg-gradient-to-br';
  const hoverEffects = `pointer-events-none absolute inset-0 ${hoverDirection} ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`;
  const lineEffects = minimal
    ? ''
    : `mb-4 h-1.5 w-14 rounded-full bg-gradient-to-r ${accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`;
  const titleClassName = minimal
    ? 'text-base font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100 sm:text-lg'
    : 'text-xl font-semibold tracking-[-0.01em] text-zinc-900 transition-colors duration-300 group-hover:text-white dark:text-zinc-100';
  const descriptionClassName = minimal
    ? 'mt-2 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400'
    : 'mt-2 text-sm leading-5 text-zinc-500 transition-colors duration-300 group-hover:text-white/90 dark:text-zinc-400';
  const cardClassNames = cn(
    'group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 p-5 transition duration-300 dark:border-zinc-800',
    minimal
      ? 'bg-transparent hover:border-zinc-300'
      : 'bg-zinc-50 hover:border-zinc-300 hover:bg-white dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:bg-zinc-900',
    className,
  );

  const content = (
    <>
      <div className={hoverEffects} />
      <div className="relative flex h-full flex-col">
        {badge ? <div className="mb-3">{badge}</div> : null}
        {minimal ? null : <div className={lineEffects} />}
        <h3 className={titleClassName}>
          {title}
        </h3>
        {description ? (
          <p className={descriptionClassName}>
            {description}
          </p>
        ) : null}
        {children ? <div className="relative mt-auto pt-4">{children}</div> : null}
      </div>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassNames}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={cardClassNames}>
        {content}
      </Link>
    );
  }

  return <div className={cardClassNames}>{content}</div>;
}
