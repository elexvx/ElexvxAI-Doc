import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  children?: React.ReactNode;
}

export function PageHeader({ title, description, cta, children }: PageHeaderProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 px-5 py-8 sm:px-7 sm:py-10 dark:border-zinc-800 mb-12 text-center bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-[var(--fd-layout-width)]">
        <h1 className="text-3xl leading-tight font-bold tracking-[-0.02em] text-zinc-900 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8 dark:text-zinc-400 whitespace-pre-line">
          {description}
        </p>
        {cta && (
          <div className="mt-8 flex items-center justify-center">
            <Link
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              rel={cta.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {cta.label}
            </Link>
          </div>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
