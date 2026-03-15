import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function readTextFile(filePath: string): Promise<string> {
  return readFile(filePath, 'utf8');
}

export function joinPath(...segments: string[]): string {
  return path.join(...segments);
}
