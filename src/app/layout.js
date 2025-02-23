import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";




const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Nextlook",
  description: "Generated by create next app",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-w-[1920px] mx-auto">
      <body className={`${roboto.className}  antialiased`}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
