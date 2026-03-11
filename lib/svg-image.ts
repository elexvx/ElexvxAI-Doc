import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isSvgImage } from '@/lib/image-utils';

type SvgDimensions = {
  width: number;
  height: number;
};

function parseDimension(value: string | undefined): number | null {
  if (!value) return null;

  const match = value.trim().match(/^([0-9]*\.?[0-9]+)(?:px)?$/i);
  if (!match) return null;

  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseViewBox(value: string | undefined): SvgDimensions | null {
  if (!value) return null;

  const parts = value
    .trim()
    .split(/[\s,]+/)
    .map((part) => Number.parseFloat(part));

  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) return null;

  const width = parts[2];
  const height = parts[3];
  if (width <= 0 || height <= 0) return null;

  return { width, height };
}

function parseSvgDimensions(svgContent: string): SvgDimensions | null {
  const svgTagMatch = svgContent.match(/<svg\b[^>]*>/i);
  if (!svgTagMatch) return null;

  const svgTag = svgTagMatch[0];
  const widthAttr = svgTag.match(/\bwidth=["']([^"']+)["']/i)?.[1];
  const heightAttr = svgTag.match(/\bheight=["']([^"']+)["']/i)?.[1];
  const width = parseDimension(widthAttr);
  const height = parseDimension(heightAttr);

  if (width && height) return { width, height };

  const viewBoxAttr = svgTag.match(/\bviewBox=["']([^"']+)["']/i)?.[1];
  return parseViewBox(viewBoxAttr);
}

export async function getSvgDimensionsFromPublicPath(src: string): Promise<SvgDimensions | null> {
  if (!isSvgImage(src)) return null;
  if (!src.startsWith('/')) return null;

  const cleanSrc = src.split(/[?#]/)[0];
  const publicPath = cleanSrc.replace(/^\/+/, '');
  const filePath = path.join(process.cwd(), 'public', publicPath);

  try {
    const svgContent = await readFile(filePath, 'utf8');
    return parseSvgDimensions(svgContent);
  } catch {
    return null;
  }
}
