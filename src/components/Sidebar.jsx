"use client";
import { useAppContext } from "@/app/AppContext";
import NavLink from "@/app/components/NavLink";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Image from "next/image";
import { usePathname } from "next/navigation";
import defaultUser from "../images/fakeuser.webp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const Sidebar = () => {
  const { sidebar, user } = useAppContext();
  const pathname = usePathname();
  const handleProfileImage = (e) => {
    e.target.src = defaultUser;
  };
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
 console.log(user)
  const [showAllChannel, setShowAllChannel] = useState(false);
  const [channelLength, setChannelLength] = useState(7);
  const {
    data: channels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["channels", user],
    queryFn: async () => {
      const res = await axios.get(`fakechannel.json`);
      return res.data;
    },
  });

  const handleChannelLength = () => {
    if (!showAllChannel) {
      setChannelLength(channels.length);
      setShowAllChannel(true);
    } else {
      setChannelLength(7);
      setShowAllChannel(false);
    }
  };

  return (
    <div className="w-64 h-full py-2 aside-container overflow-y-auto">
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
              strokeWidth={1.5}
              d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
              transform="translate(2.5 2)"
            ></path>
          </svg>
          Home
        </NavLink>

        <NavLink href="/friends">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            strokeWidth={1.5}
          >
            <circle cx="8" cy="6" r="4.25"></circle>
            <path d="M10,11.25H6A4.756,4.756,0,0,0,1.25,16v4a.75.75,0,0,0,.75.75H14a.75.75,0,0,0,.75-.75V16A4.756,4.756,0,0,0,10,11.25Z"></path>
            <circle cx="16.799" cy="7.747" r="3.747"></circle>
            <path d="M22.75,16.56v3.53a.666.666,0,0,1-.66.66H15.75V16a5.7,5.7,0,0,0-1.27-3.58,3.435,3.435,0,0,1,.56-.04h3.52A4.187,4.187,0,0,1,22.75,16.56Z"></path>
          </svg>
          Friends
        </NavLink>

        <NavLink href="/messages">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            strokeWidth={1.5}
          >
            <g>
              <g>
                <rect width="24" height="24" opacity="0"></rect>
                <path d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zM8 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"></path>
              </g>
            </g>
          </svg>
          Messages
        </NavLink>

        <NavLink href="/videos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 100 100"
            viewBox="0 0 100 100"
            id="player"
            className="w-[22px] h-[22px]"
            strokeWidth={5}
          >
            <path
              d="M70.6,12.2H29.4c-9.5,0-17.2,7.7-17.2,17.2v41.2c0,9.5,7.7,17.2,17.2,17.2h41.2c9.5,0,17.2-7.7,17.2-17.2V29.4
	C87.8,19.9,80.1,12.2,70.6,12.2z M65.4,53l-24,13.7c-0.5,0.3-1.1,0.5-1.7,0.5c-0.6,0-1.2-0.2-1.7-0.5c-1.1-0.6-1.7-1.7-1.7-3V36.3
	c0-1.2,0.7-2.4,1.7-3c1.1-0.6,2.4-0.6,3.4,0l24,13.7c1.1,0.6,1.7,1.7,1.7,3S66.5,52.4,65.4,53z"
            ></path>
          </svg>
          Videos
        </NavLink>

        <NavLink href="/clips">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 512 512"
            className="w-5 h-5"
            id="electric-current"
          >
            <polygon
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="30"
              points="259.579 234.712 304.605 16.829 121.368 311.551 245.999 274.883 162.736 496.124 391.602 202.657"
            ></polygon>
          </svg>
          Clips
        </NavLink>

        <NavLink href="/subscriptons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="subscription"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M1 9C1 7.89543 1.89543 7 3 7H21C22.1046 7 23 7.89543 23 9V20C23 21.1046 22.1046 22 21 22H3C1.89543 22 1 21.1046 1 20V9zM9.53819 10.113C9.86892 9.94083 10.268 9.96694 10.5735 10.1808L15.5735 13.6808C15.8408 13.8679 16 14.1737 16 14.5 16 14.8263 15.8408 15.1321 15.5735 15.3192L10.5735 18.8192C10.268 19.0331 9.86892 19.0592 9.53819 18.887 9.20746 18.7148 9 18.3729 9 18V11C9 10.6271 9.20746 10.2852 9.53819 10.113zM20 6.5H4V4.5H20V6.5zM18 4H6V2H18V4z"
              clipRule="evenodd"
            ></path>
          </svg>
          Subscriptions
        </NavLink>
        <div className="bg-transparentbg2 w-full h-[1px] my-1" />

        <NavLink href="/profile">
          <Image
            src={user?.photo || defaultUser}
            alt="Profile Image"
            width={0}
            height={0}
            className="rounded-full w-5 h-5"
            onError={handleProfileImage}
          />
          {user?.name}
        </NavLink>

        <NavLink href="/history">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            viewBox="0 0 24 24"
            id="watch"
            className="w-[22px] h-[22px]"
            strokeWidth={1.5}
          >
            <path
              d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.5,14c-0.3,0.5-0.9,0.6-1.4,0.4l-2.6-1.5
	C11.2,12.7,11,12.4,11,12V7c0-0.6,0.4-1,1-1s1,0.4,1,1v4.4l2.1,1.2C15.6,12.9,15.7,13.5,15.5,14z"
            ></path>
          </svg>
          History
        </NavLink>

        <NavLink href="/liked">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            id="like"
            className="w-[18px] h-[18px]"
            strokeWidth={1.5}
          >
            <g id="Page-1" fillRule="evenodd" strokeWidth="1.5">
              <g id="Dribbble-Light-Preview" transform="translate(-259 -760)">
                <g id="icons" transform="translate(56 160)">
                  <path d="M203 620h4.2v-12H203v12zm20.924-8.645l-1.823 6.535c-.302 1.241-1.462 2.11-2.799 2.11H209.3v-11.979l1.805-6.196c.169-1.05 1.118-1.825 2.234-1.825 1.249 0 2.261.964 2.261 2.153V608h5.526c1.847 0 3.214 1.641 2.798 3.355z"></path>
                </g>
              </g>
            </g>
          </svg>
          Liked Videos
        </NavLink>
        <div className="bg-transparentbg2 w-full h-[1px] my-1" />

        <div className="space-y-1">
          <h1 className="font-semibold px-4 py-1">Subsriptions</h1>
          {channels.slice(0, channelLength).map((channel) => (
            <NavLink
              href="/"
              className="px-4 text-sm truncate flex items-center gap-4 py-2 hover:bg-transparentbg2 rounded-xl duration-150"
              key={channel.username}
            >
              <img
                src={channel.image}
                alt="Channel Logo"
                className="rounded-full w-6 h-6"
              />
              <h1>{channel.channelName}</h1>
            </NavLink>
          ))}
          {showAllChannel && (
            <NavLink href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                baseProfile="tiny"
                version="1.2"
                viewBox="0 0 24 24"
                id="menu"
                className="w-[20px] h-[20px]"
                strokeWidth={1.5}
              >
                <path d="M8 3H6a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 3 6v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 6 11h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 11 8V6a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 8 3zm10 0h-2a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 13 6v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 16 11h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 21 8V6a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 18 3zM8 13H6a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 3 16v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 6 21h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 11 18v-2a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 8 13zm10 0h-2a2.99 2.99 0 0 0-2.119.881A2.99 2.99 0 0 0 13 16v2c0 .825.337 1.575.881 2.119A2.99 2.99 0 0 0 16 21h2a2.99 2.99 0 0 0 2.119-.881A2.99 2.99 0 0 0 21 18v-2a2.99 2.99 0 0 0-.881-2.119A2.99 2.99 0 0 0 18 13z"></path>
              </svg>
              All Subscriptions
            </NavLink>
          )}
          <button
            className="px-4 text-sm truncate grid grid-cols-5 items-center py-2 hover:bg-transparentbg2 rounded-xl w-full duration-150"
            onClick={handleChannelLength}
          >
            {showAllChannel ? (
              <>
                <GoChevronUp className="text-lg" />{" "}
                <span className="pl-[3px]">See Less</span>
              </>
            ) : (
              <>
                <GoChevronDown className="text-lg" />{" "}
                <span className="pl-[3px]">See More</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
