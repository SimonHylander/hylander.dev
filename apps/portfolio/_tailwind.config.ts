// import { type Config } from "tailwindcss";
// import colors from "tailwindcss/colors";

// export default {
//   darkMode: ["class"],
//   content: ["./src/**/*.{ts,tsx}", "./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     boxShadow: {
//       sm: "0 1px 2px 0 rgb(0 0 0 / 0.15)",
//       DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
//       md: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
//       lg: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
//       xl: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
//       "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.75)",
//       inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.15)",
//     },
//     extend: {
//       boxShadow: {
//         card: "0px 35px 120px -15px #211e35",
//       },
//       colors: {
//         truegray: "colors.neutral",
//         gray: {
//           "750": "#333338",
//           "850": "#202023",
//           ...colors.zinc,
//         },
//         purple: {
//           "800": "#37253d",
//           "900": "#2f2035",
//         },
//         typescript: "#007acc",
//         go: "#00add8",
//         java: "#f89820",
//         rust: "#C45508",
//         php: "#AEB2D5",
//         csharp: "#9B4993",
//         nodejs: "#3C873A",
//         nextjs: "#000000",
//         react: "#61DAFB",
//         svelte: "#FF3E00",
//         vuejs: "#42b883",
//         angular: "#DD0031",
//         tailwindcss: "#38BDF8",
//         quarkus: "#4695EB",
//         spring: "#6DB33F",
//         hibernate: "#59666C",
//         mysql: "#00758F",
//         postgresql: "#336791",
//         oracle: "#F80000",
//         neo4j: "#008CC1",
//       },
//       backgroundSize: {
//         landing: "120rem",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: {
//             height: "0",
//           },
//           to: {
//             height: "var(--radix-accordion-content-height)",
//           },
//         },
//         "accordion-up": {
//           from: {
//             height: "var(--radix-accordion-content-height)",
//           },
//           to: {
//             height: "0",
//           },
//         },
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
//   safelist: [
//     "text-typescript",
//     "text-go",
//     "text-java",
//     "text-rust",
//     "text-php",
//     "text-csharp",
//     "text-nodejs",
//     "text-nextjs",
//     "text-react",
//     "text-svelte",
//     "text-vuejs",
//     "text-angular",
//     "text-tailwindcss",
//     "text-quarkus",
//     "text-spring",
//     "text-hibernate",
//     "text-mysql",
//     "text-postgresql",
//     "text-oracle",
//     "text-neo4j",
//     "group-hover:text-typescript",
//     "group-hover:text-go",
//     "group-hover:text-java",
//     "group-hover:text-rust",
//     "group-hover:text-php",
//     "group-hover:text-csharp",
//   ],
// } satisfies Config;
