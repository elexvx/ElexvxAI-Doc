import Link from 'next/link';
import { sponsorsConfig } from '@/config/sponsors';
import { siteLayout } from '@/config/site';

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.15),transparent_30%)]" />
      <div className={`relative mx-auto w-full ${siteLayout.containerClass} px-6 pb-20 pt-16`}>
        <h1 className="text-4xl font-bold text-white md:text-5xl">{sponsorsConfig.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{sponsorsConfig.subtitle}</p>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sponsorsConfig.items.map((sponsor) => (
            <article key={sponsor.name} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
              <img src={sponsor.image} alt={sponsor.name} className="h-52 w-full object-cover" />
              <div className="space-y-3 p-6">
                <h2 className="text-2xl font-semibold text-white">{sponsor.name}</h2>
                <p className="text-sm text-cyan-300">{sponsor.role}</p>
                <p className="text-sm leading-6 text-slate-300">{sponsor.intro}</p>
                <Link href={sponsor.website} target="_blank" className="inline-block rounded-full border border-white/25 px-4 py-2 text-sm hover:border-cyan-300 hover:text-cyan-200">
                  访问官网 ↗
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
