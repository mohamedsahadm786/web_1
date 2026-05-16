/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        navy: 'var(--navy)',
        'navy-deep': 'var(--navy-deep)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        violet: 'var(--violet)',
        'cyan-glow': 'var(--cyan-glow)',
        'on-dark': 'var(--on-dark)',
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      borderRadius: {
        pill: '50px',
      },
      boxShadow: {
        card: '0 18px 40px -22px rgba(10,31,92,0.35)',
        glow: '0 0 40px -8px rgba(60,224,255,0.55)',
        'glow-violet': '0 0 50px -10px rgba(109,74,255,0.6)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(40px,-30px,0) scale(1.15)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        sheen: 'sheen 1.1s ease-smooth',
        bob: 'bob 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
