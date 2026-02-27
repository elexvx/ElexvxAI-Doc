import {
  Book,
  Code,
  Gift,
  PenTool,
  Rocket,
  Settings,
  Terminal,
  Webhook,
} from '@lucide/astro';

const ICON_MAP = {
  rocket: Rocket,
  book: Book,
  code: Code,
  terminal: Terminal,
  settings: Settings,
  webhook: Webhook,
  'pen-tool': PenTool,
  gift: Gift,
} as const;

export function getLucideIcon(iconName: string | undefined) {
  if (!iconName) return Code;
  const normalized = iconName.trim().toLowerCase().replace(/\s+/g, '-');
  return ICON_MAP[normalized as keyof typeof ICON_MAP] ?? Code;
}
