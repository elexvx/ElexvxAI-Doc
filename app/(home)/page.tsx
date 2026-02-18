import { homeConfig } from '@/config/home';
import { HomeTemplate } from '@/components/home/home-template';
import { SiteFooter } from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <>
      <HomeTemplate config={homeConfig} />
      <SiteFooter />
    </>
  );
}
