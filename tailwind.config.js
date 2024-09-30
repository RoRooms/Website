/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import { dark } from 'daisyui/src/theming/themes';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [ daisyui, typography ],
  daisyui: {
    themes: [
      {
        dark: {
          ...dark,
          primary: "#8566FF",
          secondary: "white",
          primaryGradient: "linear-gradient(to bottom, #5033ff 0%,#7c5bff 100%)",
          background: "black"
        }
      },
    ]
  }
}

