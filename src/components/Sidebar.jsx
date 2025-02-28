"use client";
import { useAppContext } from "@/app/AppContext";
import NavLink from "@/app/components/NavLink";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { sidebar } = useAppContext();
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return (
    <div className="w-64 h-full">
      <section className="px-3 flex flex-col gap-1">
        <NavLink href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
              transform="translate(2.5 2)"
            ></path>
          </svg>
          Home
        </NavLink>

        <NavLink href="/friends">Friends</NavLink>

        <NavLink href="/videos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M51.83 8H12.17a10 10 0 0 0-10 10v28a10 10 0 0 0 10 10h39.66a10 10 0 0 0 10-10V18a10 10 0 0 0-10-10Zm-9.12 26.64-16.41 8.8a3 3 0 0 1-1.42.36 3 3 0 0 1-3-3V23.2a3 3 0 0 1 4.42-2.64l16.41 8.8a3 3 0 0 1 0 5.28Zm-16.83-9.77L39.17 32l-13.29 7.13Z"
            ></path>
          </svg>
          Videos
        </NavLink>

        <NavLink href="/clips">Clips</NavLink>

        <NavLink href="/subscriptons">Subscriptions</NavLink>
        <div className="bg-transparentbg2 w-full h-[1px] my-1" />

        <NavLink href="/profile">Profile</NavLink>

        <NavLink href="/history">History</NavLink>

        <NavLink href="/liked">Liked Videos</NavLink>
      </section>
    </div>
  );
};

export default Sidebar;
