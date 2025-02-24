
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";




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
        <SessionWrapper>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  );
}
