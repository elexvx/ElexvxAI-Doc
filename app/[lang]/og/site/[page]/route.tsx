import { ImageResponse } from '@takumi-rs/image-response';
import { notFound } from 'next/navigation';
import { getSeoPage, type SeoPageKey } from '@/lib/seo-content';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const revalidate = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

const validPages: SeoPageKey[] = ['home', 'blog', 'sponsors', 'maintenance', 'docs', 'about'];

function getPageAccent(page: SeoPageKey) {
  switch (page) {
    case 'home':
      return ['#2563eb', '#06b6d4'];
    case 'blog':
      return ['#7c3aed', '#0ea5e9'];
    case 'sponsors':
      return ['#10b981', '#22c55e'];
    case 'maintenance':
      return ['#52525b', '#ef4444'];
    case 'docs':
      return ['#0f172a', '#334155'];
    case 'about':
      return ['#f97316', '#f43f5e'];
    default:
      return ['#111827', '#2563eb'];
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string; page: string }> },
) {
  const { lang, page } = await params;
  if (!isLocale(lang) || !validPages.includes(page as SeoPageKey)) notFound();

  const locale = lang as AppLocale;
  const pageKey = page as SeoPageKey;
  const seo = await getSeoPage(locale, pageKey);
  const [accentA, accentB] = getPageAccent(pageKey);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background:
            `radial-gradient(circle at top right, ${accentB}22 0%, transparent 42%), radial-gradient(circle at bottom left, ${accentA}26 0%, transparent 44%), linear-gradient(135deg, #0b0b0f 0%, #111218 52%, #09090b 100%)`,
          color: '#f5f5f5',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{siteConfig.name}</div>
            <div style={{ fontSize: 18, color: '#b9bcc7' }}>
              {locale === 'zh' ? 'AI研究 · 企业数字化 · 产业落地' : 'AI Research · Digitalization · Deployment'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 16,
                color: '#e5e7eb',
              }}
            >
              {locale === 'zh' ? '中文' : 'English'}
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${accentA}, ${accentB})`,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.05em',
            }}
          >
            {seo.title}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#d4d7de', maxWidth: 920 }}>{seo.description}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 840 }}>
            {(seo.keywords ?? []).slice(0, 5).map((keyword) => (
              <div
                key={keyword}
                style={{
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#f3f4f6',
                  fontSize: 18,
                }}
              >
                {keyword}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, color: '#9ca3af' }}>{siteConfig.url.replace('https://', '')}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      format: 'webp',
      headers: {
        'Cache-Control': CACHE_CONTROL,
      },
    },
  );
}
