"use client";

import { useAppContext } from "@/app/AppContext";
import { GoPlus } from "react-icons/go";
import defaultUser from "../images/fakeuser.webp";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserStory = () => {

  const { user } = useAppContext();
  const handleProfileImage = (e) => {
    e.target.src = defaultUser;
  };

  const {data: stories = []} = useQuery({
    queryKey: ["stories", user],
    queryFn: async() => {
        const res = await axios.get('fakeStory.json')
        return res.data
    }
  })

 

  return (
    <div className="w-[1050px]  mx-auto">
    
      <Swiper
       width={500}
       spaceBetween={-325}
       freeMode={true}
       pagination={{
       clickable: true,
       }}
       modules={[FreeMode, Pagination]}
      >
    
       
        <SwiperSlide>
          <div className="w-40 cursor-pointer story-container hover:opacity-90 duration-100 h-56 overflow-hidden rounded-3xl relative">
            <img
              src={user?.photo || defaultUser}
              alt="Profile Image"
              width={0}
              height={0}
              className="w-full h-full object-cover story-img"
              onError={handleProfileImage}
            />
            <div className="w-full h-2/4 bg-gradient-to-t from-black/70 to-transparent bottom-0 left-0 absolute flex justify-center items-end pb-4">
              <div className="flex items-center gap-1">
              <div className="bg-primary flex items-center justify-center w-max rounded-full p-1"><GoPlus className="text-[20px] font-bold text-black"/></div>
              <h2 className="text-foreground font-medium">Create Story</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        

       {
        stories.map(story => <SwiperSlide key={story.id}>
            <div className="w-40 cursor-pointer story-container hover:opacity-90 duration-100 h-56 overflow-hidden rounded-3xl relative">
            <img
              src={story.storyThumbnail}
              alt="Story Image"
              width={0}
              height={0}
              className="w-full h-full object-cover story-img"
          
            />
            </div>
        </SwiperSlide>)
        }

       
      </Swiper>
    </div>
  );
};

export default UserStory;
