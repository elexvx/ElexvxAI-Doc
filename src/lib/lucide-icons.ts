import {
  Book,
  Code,
  Gift,
  LifeBuoy,
  PenTool,
  Rocket,
  Rss,
  Settings,
  Sparkles,
  Terminal,
  Users,
  Webhook,
} from '@lucide/astro';

const ICON_MAP = {
  rocket: Rocket,
  book: Book,
  code: Code,
  terminal: Terminal,
  settings: Settings,
  webhook: Webhook,
  'life-buoy': LifeBuoy,
  'pen-tool': PenTool,
  gift: Gift,
  users: Users,
  sparkles: Sparkles,
  rss: Rss,
} as const;

export function getLucideIcon(iconName: string | undefined) {
  if (!iconName) return Code;
  const normalized = iconName.trim().toLowerCase().replace(/\s+/g, '-');
  return ICON_MAP[normalized as keyof typeof ICON_MAP] ?? Code;
}
