import { changelogConfig } from '@/config/changelog';
import { siteLayout } from '@/config/site';

export default function ChangelogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.16),transparent_30%)]" />
      <div className={`relative mx-auto w-full ${siteLayout.containerClass} px-6 pb-20 pt-16`}>
        <h1 className="text-4xl font-bold text-white md:text-5xl">{changelogConfig.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{changelogConfig.subtitle}</p>

        <div className="mt-10 space-y-6 border-l border-cyan-400/40 pl-6">
          {changelogConfig.entries.map((entry) => (
            <article key={`${entry.date}-${entry.version}`} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-400">{entry.date} · {entry.version}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{entry.title}</h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                {entry.items.map((item) => (
                  <li key={item} className="list-disc ml-5">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
