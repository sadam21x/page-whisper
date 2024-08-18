import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
