import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBrown: "#171717",
        lightBrown: "#393939",
        lightWhite: "#E1E4E8",
        customRed: "rgb(234, 86, 81)",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
