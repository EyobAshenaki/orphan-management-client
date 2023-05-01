/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: true,
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      width: {
        128: '32rem',
        160: '40rem',
        192: '48rem',
        224: '56rem',
      },
    },
  },
  plugins: [],
}
