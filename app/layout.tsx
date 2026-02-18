import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/search';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <AISearch>
          <RootProvider>{children}</RootProvider>
          <AISearchTrigger />
          <AISearchPanel />
        </AISearch>
      </body>
    </html>
  );
}
