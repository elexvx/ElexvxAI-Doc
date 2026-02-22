import { parse } from 'yaml';

const yamlFiles = import.meta.glob('../data/pages/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export async function loadYaml<T>(relativePath: string): Promise<T> {
  const target = `../data/pages/${relativePath}`;
  const raw = yamlFiles[target];
  if (!raw) {
    throw new Error(`YAML not found: ${relativePath}`);
  }
  return parse(raw) as T;
}
