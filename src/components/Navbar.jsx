"use client";
import { useAppContext } from "@/app/AppContext";
import Image from "next/image";
import Link from "next/link";
import { PiBellSimple } from "react-icons/pi";
import defaultUser from "../images/fakeuser.webp";
import { HiOutlineMenu } from "react-icons/hi";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const {user, handleSidebar} = useAppContext()
    const pathname = usePathname()
    const handleProfileImage = (e) => { 
        e.target.src = defaultUser
    }
    if (pathname === '/login' || pathname === '/signup') {
      return null; 
    }
    
  return (
    <nav className="py-3 flex items-center justify-between px-5">
      <div className="flex items-center gap-4">
        <button onClick={handleSidebar} className="text-xl hover:bg-transparentbg2 p-2 rounded-full">
          <HiOutlineMenu/>
        </button>
      <Link href="/" className="text-2xl logo">
        Nexlook
      </Link>
      </div>
      <form className="w-4/12">
        <div className="flex items-center bg-transparentbg overflow-hidden rounded-full border border-transparentbg2">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 placeholder:opacity-50 bg-transparent py-1 focus:outline-none"
          />
          <button className="bg-transparentbg rounded-full px-5 py-2 opacity-80 hover:opacity-100 duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="search"
              className="text-foreground cursor-pointer fill-current w-5 h-5 "
            >
              <path
                d="M19.7555474,18.6065254 L16.3181544,15.2458256 L16.3181544,15.2458256 L16.2375905,15.1233001 C16.0877892,14.9741632 15.8829641,14.8901502 15.6691675,14.8901502 C15.4553709,14.8901502 15.2505458,14.9741632 15.1007444,15.1233001 L15.1007444,15.1233001 C12.1794834,17.8033337 7.6781476,17.94901 4.58200492,15.4637171 C1.48586224,12.9784243 0.75566836,8.63336673 2.87568494,5.31016931 C4.99570152,1.9869719 9.30807195,0.716847023 12.9528494,2.34213643 C16.5976268,3.96742583 18.4438102,7.98379036 17.2670181,11.7275931 C17.182269,11.9980548 17.25154,12.2921761 17.4487374,12.4991642 C17.6459348,12.7061524 17.9410995,12.794561 18.223046,12.7310875 C18.5049924,12.667614 18.7308862,12.4619014 18.8156353,12.1914397 L18.8156353,12.1914397 C20.2223941,7.74864367 18.0977423,2.96755391 13.8161172,0.941057725 C9.53449216,-1.08543846 4.38083811,0.250823958 1.68905427,4.08541671 C-1.00272957,7.92000947 -0.424820906,13.1021457 3.0489311,16.2795011 C6.5226831,19.4568565 11.8497823,19.6758854 15.5841278,16.7948982 L18.6276529,19.7705177 C18.9419864,20.0764941 19.4501654,20.0764941 19.764499,19.7705177 C20.0785003,19.4602048 20.0785003,18.9605974 19.764499,18.6502845 L19.764499,18.6502845 L19.7555474,18.6065254 Z"
                transform="translate(2 2)"
              ></path>
            </svg>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <button className="hover:bg-transparentbg2  rounded-full p-2 text-xl opacity-80 hover:opacity-100 duration-150">
        <PiBellSimple />
        </button>
        <div className="relative inline-block">
          <button>
            <Image
              src={user?.photo || defaultUser}
              alt="Profile Image"
              width={40}
              height={40}
              className="rounded-full w-7 h-7"
              onError={handleProfileImage}
            />
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
