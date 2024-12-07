// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: "poppins",
//         questrial: "Questrial",
//         raleway: "Raleway",
//         roboto: "Roboto",
//         josefin: "Josefin Sans",
//       },
//       display: ["group-hover"],
//       colors: {
//         primary: "#0A9A73",
//         secondary: "#071C1F",
//         green: "#24d53b",
//         red: "#F01515",
//       },
//     },
//   },
//   plugins: [require("tailwind-scrollbar")],
// };
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "poppins",
        questrial: "Questrial",
        raleway: "Raleway",
        roboto: "Roboto",
        josefin: "Josefin Sans",
      },
      display: ["group-hover"],
      colors: {
        primary: "#0A9A73",
        secondary: "#071C1F",
        green: "#24d53b",
        red: "#F01515",
      },
    },
  },
  plugins: [tailwindScrollbar],
};
