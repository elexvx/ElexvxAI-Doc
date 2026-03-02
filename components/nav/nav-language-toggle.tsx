'use client';

import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { cn } from '@/lib/cn';
import { Languages, ChevronDown } from 'lucide-react';

export function NavLanguageToggle({
  showText = false,
  showChevron = false,
  className,
}: {
  showText?: boolean;
  showChevron?: boolean;
  className?: string;
}) {
  const context = useI18n();
  const currentName = context.locales?.find((item) => item.locale === context.locale)?.name;

  if (!context.locales || context.locales.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger
        aria-label={context.text.chooseLanguage}
        className={cn(
          buttonVariants({
            color: 'ghost',
            size: showText ? undefined : 'icon',
            className: showText ? 'gap-1.5 p-1.5' : undefined,
          }),
          className,
        )}
      >
        <Languages className="size-5" />
        {showText && <span>{currentName}</span>}
        {showChevron && <ChevronDown className="size-3 text-fd-muted-foreground" />}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-x-hidden p-0">
        <p className="mb-1 p-2 text-xs font-medium text-fd-muted-foreground">{context.text.chooseLanguage}</p>
        {context.locales.map((item) => (
          <button
            key={item.locale}
            type="button"
            className={cn(
              'p-2 text-start text-sm',
              item.locale === context.locale
                ? 'bg-fd-primary/10 font-medium text-fd-primary'
                : 'hover:bg-fd-accent hover:text-fd-accent-foreground',
            )}
            onClick={() => context.onChange?.(item.locale)}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

