// import UserStory from "@/components/UserStory";

import UploadingBar from "@/components/UploadingBar";
import UserStory from "@/components/UserStory";



export default function Home() {
 
  return (
    <div className="flex w-full justify-between">
      {/* <h1>Welcome, {session.user.name}!</h1>
     <p>Email: {session.user.email}</p>

     <SignOutButton/> */}
      <section className="w-10/12 flex flex-col mx-auto px-44 ">
        {/* <UserStory/> */}
        <UserStory />

        {/* Uploading Bar */}
        <UploadingBar />
      </section>
      <section className="w-64 ">hello</section>
    </div>
  );
}
