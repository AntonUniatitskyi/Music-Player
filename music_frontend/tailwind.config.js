/** @type {import('tailwindcss').Config} */
module.exports = {
  // Пути к файлам, где используются классы Tailwind (для purge/оптимизации)
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    // Базовая тема (используется по умолчанию; extend для добавлений/переопределений)
    extend: {
      // Пример расширения: кастомные цвета, шрифты и т.д.
      colors: {
        // Дефолтные цвета (пример для red и blue; полный список в docs)
        red: {
          50: 'oklch(97.1% 0.013 17.38)',
          100: 'oklch(93.6% 0.032 17.717)',
          200: 'oklch(88.5% 0.062 18.334)',
          300: 'oklch(80.8% 0.114 19.571)',
          400: 'oklch(70.4% 0.191 22.216)',
          500: 'oklch(63.7% 0.237 25.331)',
          600: 'oklch(57.7% 0.245 27.325)',
          700: 'oklch(50.5% 0.213 27.518)',
          800: 'oklch(44.4% 0.177 26.899)',
          900: 'oklch(39.6% 0.141 25.723)',
          950: 'oklch(25.8% 0.092 26.042)',
        },
        blue: {
          50: 'oklch(98% 0.014 264.9)',
          100: 'oklch(95.3% 0.033 265.79)',
          200: 'oklch(92.2% 0.061 263.36)',
          300: 'oklch(87.4% 0.109 261.51)',
          400: 'oklch(80.2% 0.169 259.89)',
          500: 'oklch(67.6% 0.216 260.8)',
          600: 'oklch(58.8% 0.219 260.84)',
          700: 'oklch(48.7% 0.189 260.51)',
          800: 'oklch(40.8% 0.155 260.19)',
          900: 'oklch(34.8% 0.123 259.93)',
          950: 'oklch(24.2% 0.082 260.02)',
        },
        // Добавьте другие цвета: gray, green, yellow и т.д. (полный список ~20 палитр)
      },
      fontFamily: {
        // Дефолтные шрифты (можно extend)
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      spacing: {
        // Дефолтные значения: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
        // Можно extend: '72': '18rem',
      },
      // Другие extend: screens (breakpoints), borderRadius, boxShadow, zIndex и т.д.
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    // Если нужно переопределить базовую тему (редко), добавьте здесь (не в extend)
    // Например: colors: { ... }
  },
  // Плагины (добавляйте, если нужно, напр. require('@tailwindcss/forms'))
  plugins: [],
}