/**
 * Image resolver. Eagerly imports everything under src/images/** and builds a
 * lookup keyed by "<folder>/<name>" (no extension, lower-cased).
 *
 * Drop a correctly-named file into src/images/<folder>/ and it appears with no
 * code change. A missing file falls back to <Placeholder>.
 */
const modules = import.meta.glob('../images/**/*.{png,jpg,jpeg,webp,avif,svg,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const VIDEO = /\.(mp4|webm|mov)$/i;

type Asset = { url: string; isVideo: boolean };

const lookup: Record<string, Asset> = {};

for (const [path, url] of Object.entries(modules)) {
  // path -> ../images/<folder>/<name>.<ext>
  const m = path.match(/images\/(.+)\/([^/]+)\.[^.]+$/);
  if (!m) continue;
  const key = `${m[1]}/${m[2]}`.toLowerCase();
  lookup[key] = { url, isVideo: VIDEO.test(path) };
}

/** Resolve "folder/name" (no extension) to an asset, or null if absent. */
export function resolveImage(name: string): Asset | null {
  return lookup[name.toLowerCase()] ?? null;
}
