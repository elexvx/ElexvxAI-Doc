const SVG_IMAGE_PATH_PATTERN = /\.svg(?:$|[?#])/i;

export function isSvgImage(src: string): boolean {
  return SVG_IMAGE_PATH_PATTERN.test(src.trim());
}
