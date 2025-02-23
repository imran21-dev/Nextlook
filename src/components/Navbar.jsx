// "use client"

// import { Moon, Sun } from "lucide";
// import { useTheme } from "next-themes";
// import Link from "next/link";


// const Navbar = () => {

//     const { theme, setTheme } = useTheme();

//     const toggleTheme = () => {
//       setTheme(theme === 'light' ? 'dark' : 'light');
//     };


//   return (
//     <nav className="py-3 flex items-center justify-between dark:bg-secondary">
//       <Link href="/" className="text-3xl font-bold logo-font">
//         Nexlook
//       </Link>
        
//       <button
//         onClick={toggleTheme}
//         className="p-2 rounded-lg  transition"
//       >
//         {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
