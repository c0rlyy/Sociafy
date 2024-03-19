/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: "Helvetica, Arial, sans-serif",
      logoFont: "Lora",
    },
    fontSize: {
      postCont: `clamp(.8rem,1.2vw,2.3rem)`,
      postTitle: `clamp(.5rem,1vw,1rem)`,
      postUser: `clamp(.7rem,1vw,2rem)`,
      account: `clamp(.8rem,1vw,2rem)`,
    },
    gridTemplateColumns: {
      landing: `minmax(0,20rem) minmax(0,1fr) minmax(0,1fr) minmax(0,20rem)`,
      postColumns: `minmax(0,50%) minmax(17rem,40rem) minmax(0,50%)`,
    },
  },
};
export const darkMode = "class";
export const plugins = [];
