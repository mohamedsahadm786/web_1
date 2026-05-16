import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Rotating typewriter effect over a list of strings. */
export function useTypewriter(words: string[], speed = 55, pause = 1700) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(words[0] ?? '');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length < 2) {
      setText(words[0] ?? '');
      return;
    }
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === '';

    let delay = deleting ? speed / 2 : speed;
    if (done) delay = pause;
    if (cleared) delay = 350;

    const t = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause, reduced]);

  return text;
}
