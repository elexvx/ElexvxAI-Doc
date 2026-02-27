import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

function extractVersionFromEntryId(entryId: string): string | undefined {
  for (const segment of entryId.split("/")) {
    if (/^v\d+$/i.test(segment)) return segment.toLowerCase();
  }
  return undefined;
}

function extractSidebarVersions(sidebar: any[]): string[] {
  const versions = new Set<string>();
  for (const entry of sidebar) {
    if (!entry || entry.type !== "group") continue;
    const label = String(entry.label ?? "").toLowerCase().trim();
    if (/^v\d+$/.test(label)) versions.add(label);
  }
  return Array.from(versions);
}

function hrefMatchesVersion(href: string, version: string): boolean {
  return href.includes(`/${version}/`) || href.endsWith(`/${version}`);
}

function filterSidebarEntry(
  entry: any,
  version: string,
  knownVersions: ReadonlySet<string>,
): any | null {
  if (!entry || typeof entry !== "object") return null;

  if (entry.type === "link") {
    return typeof entry.href === "string" && hrefMatchesVersion(entry.href, version)
      ? entry
      : null;
  }

  if (entry.type === "group") {
    const label = String(entry.label ?? "").toLowerCase().trim();
    const isVersionGroup = knownVersions.has(label);
    if (isVersionGroup && label !== version) return null;

    const entries = Array.isArray(entry.entries)
      ? entry.entries
          .map((child: any) => filterSidebarEntry(child, version, knownVersions))
          .filter(Boolean)
      : [];

    if (!isVersionGroup && entries.length === 0) return null;

    return { ...entry, entries };
  }

  return null;
}

export const onRequest = defineRouteMiddleware((context, next) => {
  const route = context.locals.starlightRoute;
  if (!route?.entry?.id || !Array.isArray(route.sidebar)) return next();

  const currentVersion = extractVersionFromEntryId(route.entry.id);
  if (!currentVersion) return next();
  const configuredVersions = extractSidebarVersions(route.sidebar);
  const versions = configuredVersions.length > 0 ? configuredVersions : [currentVersion];
  const versionSet = new Set(versions);

  route.sidebar = route.sidebar
    .map((entry: any) => filterSidebarEntry(entry, currentVersion, versionSet))
    .filter(Boolean);

  const localePrefix = route.locale ? `/${route.locale}` : "";
  const isZh = String(route.lang || "").toLowerCase().startsWith("zh");
  const versionGroupLabel = isZh ? "版本" : "Versions";

  route.sidebar.unshift({
    type: "group",
    label: versionGroupLabel,
    collapsed: false,
    badge: undefined,
    entries: versions.map((version) => ({
      type: "link",
      label: version.toUpperCase(),
      href: `${localePrefix}/${version}/`,
      isCurrent: version === currentVersion,
      badge: undefined,
      attrs: {},
    })),
  });

  return next();
});
