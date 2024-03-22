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
      userProfile: `minmax(5rem,30rem) minmax(5rem,30rem) minmax(5rem,30rem)`,
      layout: `minmax(0,18%) minmax(0,1fr) minmax(0,40ch)`,
      PostCardColumns: `minmax(0,5ch) minmax(10rem, 1fr) minmax(0,30ch)`,
      userProfileLayout: `minmax(0,30ch) minmax(0,1fr)`,
      userProfileUpperMenu: `minmax(0,15ch) minmax(0,1fr)`,
      mainPageCenterContainer: `minmax(5rem, 10rem) minmax(5rem,1fr) minmax(0,20ch)`,
      Layout: `minmax(0,30ch) minmax(0,1fr)`,
      userProfileLayoutGrid: `minmax(0,30%) minmax(0rem,1fr) minmax(0,30ch) `,
      fileUploaderLayout: `minmax(0,30ch) minmax(0,1fr)`
    },
    gridTemplateRows: {
      userProfileRows: `minmax(0,25rem)`,
      userProfileContainerRows: `minmax(0,20rem) minmax(0,1fr)`,
      PostPageRows: `minmax(5rem,15rem)`,
      postCard: `minmax(10ch, 15ch) minmax(0,1fr) minmax(5ch, 10ch) minmax(5ch, 15ch)`,
      footer: `minmax(0,15ch) minmax(0,30rem) minmax(0,5ch)`,
      mainPageCenterContainer: `minmax(5rem 8ch) minmax(4rem, 15ch) minmax(0,1fr)`,
      recommendedContainer: `minmax(5rem,10rem) minmax(0,10rem) minmax(0,1fr)`,
      fileUploaderRows: `minmax(0,15rem) minmax(5ch, 10ch) minmax(0,1fr)`
    },
    gridColumn: {
      userPictures: `2/ span 3`,
    },
    gridRows: {
      userPicturesRow: `1/ span 4`,
    },
    gridAutoRows: {
      userProfileRows: `minmax(10rem,25rem)`,
    },
  },
};
export const darkMode = "class";
export const plugins = [];
