import { getLivePreviewBus } from '@/lib/live-preview';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(null, { status: 204 });
  }

  const bus = getLivePreviewBus();
  bus.start();

  let cleanup: (() => void) | undefined;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      const write = (value: string) => controller.enqueue(encoder.encode(value));

      write(`event: connected\ndata: ${Date.now()}\n\n`);

      const unsubscribe = bus.subscribe((event) => {
        write(`event: change\ndata: ${JSON.stringify(event)}\n\n`);
      });

      const keepAlive = setInterval(() => {
        write(`event: ping\ndata: ${Date.now()}\n\n`);
      }, 15000);

      cleanup = () => {
        clearInterval(keepAlive);
        unsubscribe();
      };
    },
    cancel() {
      cleanup?.();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
