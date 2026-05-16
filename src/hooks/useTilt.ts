import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

/** Pointer-tracked 3D tilt for a card. Returns handlers + motion styles. */
export function useTilt(max = 10) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);

  function onMove(e: React.PointerEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return {
    ref,
    onMove,
    onLeave,
    style: reduced ? {} : { rotateX, rotateY, transformPerspective: 900 },
    glare: { x: glareX, y: glareY },
    reduced,
  };
}
