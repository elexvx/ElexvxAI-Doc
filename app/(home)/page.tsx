import { homeConfig } from '@/config/home';
import { HomeTemplate } from '@/components/home/home-template';

export default function HomePage() {
  return <HomeTemplate config={homeConfig} />;
}
