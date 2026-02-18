import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomeConfig } from '@/config/home';
import { homeSignalIcons } from '@/config/home';

export function HomeTemplate({ config }: { config: HomeConfig }) {
  const SparklesIcon = homeSignalIcons.sparkles;
  const RocketIcon = homeSignalIcons.rocket;

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(129,140,248,0.2),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-16">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl md:p-12">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-cyan-200">
            <SparklesIcon className="h-3.5 w-3.5" />
            {config.hero.badge}
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            {config.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            {config.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={config.hero.primaryAction.href}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
            >
              {config.hero.primaryAction.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={config.hero.secondaryAction.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              <RocketIcon className="h-4 w-4" />
              {config.hero.secondaryAction.label}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {config.hero.metrics.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-2xl font-semibold text-cyan-300">{item.value}</p>
                <p className="mt-2 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {config.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-6"
              >
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {config.highlights.map((highlight) => (
            <article key={highlight.title} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h4 className="text-base font-semibold text-cyan-100">{highlight.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.description}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">案例文档精选</h2>
            <Link href="/docs/cases" className="text-sm text-cyan-300 hover:text-cyan-200">
              查看全部案例 →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {config.cases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-cyan-400/70"
              >
                <p className="text-xs font-semibold tracking-[0.15em] text-cyan-300">{item.tag}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
