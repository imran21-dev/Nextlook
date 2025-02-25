
import { WordRotate } from "@/components/magicui/word-rotate";
import friends from "../../images/friends.png";
import content from "../../images/content.png";
import secure from "../../images/secure.png";
import Image from "next/image";
import LoginForm from "../components/LoginForm";

const Page = () => {
 

  return (
    <div className="h-screen overflow-hidden  grid grid-cols-5 justify-items-center p-20 gap-6 relative">
      <div className="absolute opacity-20 inset-0 -z-10 rounded-full bg-primary blur-[300px] w-[800px] h-[800px] left-1/2 -top-2 -translate-x-1/2 -translate-y-1/2" />

      {/* Text section */}
      <section className="w-full col-span-2">
        <h1 className="logo text-4xl text-primary">Nextlook</h1>
        <WordRotate
          className="text-3xl font-bold py-1"
          words={[
            "Watch, Share, Connect.",
            "Your Social Hub for Videos & Posts.",
            "Like, Share, Enjoy.",
            "Your Digital World in One Place.",
            "Bringing People and Content Together.",
          ]}
        />
        <p className="opacity-40 text-sm pb-8">
          Stay social with seamless connections, endless content, and built-in
          security—your all-in-one platform for sharing and engaging.
        </p>

        <div>
          <Image
            src={friends}
            alt="Friends Icon"
            className="w-8 pb-3 pt-7 opacity-80"
          ></Image>
          <h1 className="text-lg font-semibold pb-1">Seamless Connections</h1>
          <p className="opacity-60">
            Stay connected with friends and communities effortlessly, just like
            Facebook. Engage in conversations, share memories, and build your
            network.
          </p>
        </div>

        <div>
          <Image
            src={content}
            alt="Friends Icon"
            className="w-8 pb-3 pt-7 opacity-80"
          ></Image>
          <h1 className="text-lg font-semibold pb-1">Unlimited Content</h1>
          <p className="opacity-60">
            Explore a world of videos and posts, just like YouTube. Watch,
            create, and share your favorite moments anytime.
          </p>
        </div>

        <div>
          <Image
            src={secure}
            alt="Friends Icon"
            className="w-8 pb-3 pt-7 opacity-80"
          ></Image>
          <h1 className="text-lg font-semibold pb-1">Privacy & Security</h1>
          <p className="opacity-60">
            Your data stays safe with our built-in security features, ensuring a
            protected and reliable social experience.
          </p>
        </div>
      </section>

      {/* Form Section */}
     <LoginForm/>
    </div>
  );
};

export default Page;
