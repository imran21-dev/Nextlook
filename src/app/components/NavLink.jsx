import Link from "next/link";
import { usePathname } from "next/navigation";


const NavLink = ({href, children}) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`px-4 text-sm truncate stroke-foreground grid grid-cols-5 items-center gap-4 py-2 hover:bg-transparentbg2 rounded-xl duration-150 ${isActive && 'fill-current bg-transparentbg text-primary stroke-primary font-medium'}`}>{children}</Link>
    );
};

export default NavLink;