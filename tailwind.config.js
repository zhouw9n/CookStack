/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "spacegrey": "#171717",
        "offwhite": "#F1F1F1",
        "orange": "#FF7F00",
        "red": "#DA1A1A",
        "lightgrey": "#BBBBBB",
        "darkgrey": "#595959",
      },
      fontSize: {
        "xsmall": "0.625rem", // 10px
        "small": "0.75rem",   // 12px
        "medium": "1rem",     // 16px
        "large": "1.5rem",    // 24px
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        "thin": "100",
        "extra-light": "200",
        "light": "300",
        "regular": "400",
        "medium": "500",
        "semi-bold": "600",
        "bold": "700",
        "extra-bold": "800",
        "black": "900",
      },
      container: {
        center: true,
        padding: "0.5rem",
      },
    },
  },
  plugins: [],
}

