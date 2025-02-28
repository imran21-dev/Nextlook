
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SessionWrapper from "./components/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "./AppContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";





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
      <body className={`${roboto.className}  antialiased h-screen overflow-y-auto`}>
        <SessionWrapper>
        <ThemeProvider attribute="class">
        <AppProvider>
          <Navbar/>
           <main className="flex h-[calc(100vh-63px)] gap-2">
          <Sidebar/>
          {children}
           </main>
        </AppProvider>
        </ThemeProvider>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  );
}
