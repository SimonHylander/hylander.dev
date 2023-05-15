import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.15)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.75)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.15)",
    },
    extend: {
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      colors: {
        truegray: colors.neutral,
        red: colors.rose,
        gray: {
          ...colors.zinc,
          750: "#333338",
          850: "#202023",
          950: "#0C0C0E",
        },
        purple: {
          800: "#37253d",
          900: "#2f2035",
        },
        typescript: "#007acc",
        go: "#00add8",
        java: "#f89820",
        rust: "#C45508",
        php: "#AEB2D5",
        csharp: "#9B4993",
      },
      backgroundImage: {
        contact: "url('/setup.png')",
      },
      backgroundSize: {
        landing: "120rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    "text-typescript",
    "text-go",
    "text-java",
    "text-rust",
    "text-php",
    "text-csharp",
    "group-hover:text-typescript",
    "group-hover:text-go",
    "group-hover:text-java",
    "group-hover:text-rust",
    "group-hover:text-php",
    "group-hover:text-csharp",
  ],
} satisfies Config;
