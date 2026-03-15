import { EventEmitter } from 'events';
import { existsSync, watch, type FSWatcher } from 'fs';
import path from 'path';

type LivePreviewEvent = {
  type: 'change';
  filePath: string;
  timestamp: number;
};

class LivePreviewBus {
  private readonly emitter = new EventEmitter();
  private readonly watchers: FSWatcher[] = [];
  private started = false;

  constructor() {
    this.emitter.setMaxListeners(0);
  }

  start() {
    if (this.started || process.env.NODE_ENV !== 'development') {
      return;
    }
    this.started = true;
    const root = process.cwd();
    const targets = ['data', 'content'].map((dir) => path.join(root, dir));
    for (const target of targets) {
      if (!existsSync(target)) {
        continue;
      }
      try {
        const watcher = watch(target, { recursive: true }, (eventType, filename) => {
          const filePath = filename ? filename.toString() : '';
          if (!this.isPreviewFile(filePath)) {
            return;
          }
          this.emitter.emit('change', {
            type: 'change',
            filePath,
            timestamp: Date.now(),
          } satisfies LivePreviewEvent);
        });
        this.watchers.push(watcher);
      } catch {
      }
    }
  }

  subscribe(listener: (event: LivePreviewEvent) => void) {
    this.emitter.on('change', listener);
    return () => {
      this.emitter.off('change', listener);
    };
  }

  private isPreviewFile(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    return ext === '.yaml' || ext === '.yml' || ext === '.md' || ext === '.mdx' || ext === '.json';
  }
}

declare global {
  var __livePreviewBus__: LivePreviewBus | undefined;
}

export function getLivePreviewBus() {
  if (!globalThis.__livePreviewBus__) {
    globalThis.__livePreviewBus__ = new LivePreviewBus();
  }
  return globalThis.__livePreviewBus__;
}
