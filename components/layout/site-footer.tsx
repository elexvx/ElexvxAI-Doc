import Link from 'next/link';
import { footerConfig } from '@/config/footer';
import { siteLayout } from '@/config/site';

export function SiteFooter() {
  return (
    <div className="border-t border-white/10 bg-slate-950 text-slate-200">
      <footer className="px-6 py-12 backdrop-blur-xl">
        <div className={`mx-auto grid w-full ${siteLayout.containerClass} gap-10 md:grid-cols-[1.2fr_2fr]`}>
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
      </footer>

      <div className="border-t border-white/10 bg-slate-950/80 px-6 py-5 text-sm text-slate-300">
        <div className={`mx-auto w-full ${siteLayout.containerClass} text-center leading-7`}>
          <p>
            本站遵循 <span className="text-cyan-300">{footerConfig.copyright.license}</span> 协议｜网站状态：
            <span className="text-cyan-300"> {footerConfig.copyright.siteStatus}</span>
          </p>
          <p>
            Copyright © {footerConfig.copyright.year} ElexvxAI Lab ｜ 隶属于
            <span className="text-cyan-300"> {footerConfig.copyright.company}</span> ｜ ICP备案：
            <span className="text-cyan-300"> {footerConfig.copyright.icp}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
