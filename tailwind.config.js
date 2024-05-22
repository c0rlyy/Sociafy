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
      landing: `minmax(0,20rem) minmax(20ch,70ch) minmax(20ch,60ch) minmax(0,5rem)`,
      postColumns: `minmax(0,50%) minmax(17rem,40rem) minmax(0,50%)`,
      userProfile: `repeat(auto-fill, minmax(200px,1fr))`,
      layout: `minmax(min-content,18%) minmax(30rem,1fr) minmax(20ch,40ch)`,
      mobileLayout: `minmax(min-content,18%) minmax(30rem,1fr)`,
      PostCardColumns: `minmax(0,5ch) minmax(350px, auto) minmax(0,10ch)`,
      userProfileLayout: `minmax(0,30ch) minmax(0,1fr)`,
      userProfileUpperMenu: `minmax(auto,15ch) minmax(50ch,700px)`,
      mainPageCenterContainer: `minmax(5rem, 10rem) minmax(40ch,1fr) minmax(0,20ch)`,
      Layout: `minmax(0,30ch) minmax(0,1fr)`,
      userProfileLayoutGrid: `minmax(0,30%) minmax(0rem,1fr) minmax(0,30ch) `,
      fileUploaderLayout: `minmax(0,30ch) minmax(0,1fr)`,
      SignUpLayout: `minmax(0,40vw) minmax(0,1fr)`,
      settingsLayout: `minmax(10vw,25vw) minmax(0,1fr)`,
    },
    gridTemplateRows: {
      userProfileRows: `auto`,
      userProfileContainerRows: `minmax(0,20rem) minmax(0,1fr)`,
      PostPageRows: `minmax(5rem,15rem)`,
      postCard: `minmax(10ch, 15ch) minmax(150px,400px) minmax(5ch, 10ch) minmax(5ch, 15ch)`,
      footer: `minmax(15ch,30ch) minmax(0,1fr)`,
      layout: ` minmax(5ch, 8ch) minmax(1fr, auto)`,
      mobileLayout: `minmax(10rem,1fr) minmax(1fr, auto)`,
      mainPageCentreContainer: `minmax(1.5rem, 3rem) minmax(0,1fr)`,
      recommendedContainer: `minmax(auto,15rem) minmax(0,13rem) minmax(0,1fr)`,
      fileUploaderRows: `minmax(0,15rem) minmax(5ch, 10ch) minmax(0,1fr)`,
      signUpRows: `minmax(0,15rem) minmax(0,40ch) minmax(0,10ch) minmax(0,1fr)`,
    },
    gridColumn: {
      userPictures: `2/ span 3`,
    },
    gridRows: {
      userPicturesRow: `1/ span 4`,
    },
    gridAutoRows: {
      userProfileRows: `minmax(100px,300px)`,
    },
    screens: {
      extraSm: "400px",
      smScreen: "640px",
    },
    maxWidth: {
      extraSmWidth: "400px",
    },
  },
};
export const darkMode = "class";
export const plugins = ["prettier-plugin-tailwindcss"];
