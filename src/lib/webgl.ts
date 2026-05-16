/**
 * One-time WebGL capability probe.
 *
 * The result is cached for the app lifetime: the probe canvas creates a real
 * WebGL context, so calling it on every render would leak contexts and
 * eventually force the browser to drop the live 3D canvas ("Too many active
 * WebGL contexts"). We detect once and immediately free the probe context.
 */
let cached: boolean | null = null;

export function supportsWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    cached = !!gl;
    // release the probe context so it does not count against the limit
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}
