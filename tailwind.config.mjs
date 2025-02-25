/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        'primary-deep': "var(--primary-deep)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        transparentbg: "var(--transparentbg)",
        transparentbg2: "var(--transparentbg2)",
        
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
