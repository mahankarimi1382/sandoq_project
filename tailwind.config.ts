import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinema: ["cinema",'san-serif'],
        yekanbakh:["yekan-bakh","san-serif"]

      },
      screens:{
        "1470":"1470px",
        "1230":"1230px",
        "800":"800px",
        "500":"500px",
        "900":"900px",
        "300":"300px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins:  [require("daisyui")],
}
export default config
