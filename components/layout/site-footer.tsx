import Link from 'next/link';
import { footerConfig } from '@/config/footer';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 px-6 py-12 text-slate-200 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-[0.22em] text-cyan-300">
            {footerConfig.brand.slogan}
          </p>
          <h3 className="text-2xl font-semibold text-white">{footerConfig.brand.name}</h3>
          <p className="text-sm leading-6 text-slate-300">{footerConfig.brand.description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerConfig.linkGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-sm font-medium text-white">{group.title}</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-cyan-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-white/10 pt-4 text-xs text-slate-400">
        {footerConfig.complianceText}
      </div>
    </footer>
  );
}
