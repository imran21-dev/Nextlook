"use client";

import { useAppContext } from "@/app/AppContext";
import defaultUser from "../images/fakeuser.webp";
import Image from "next/image";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { BorderBeam } from "@/components/magicui/border-beam";
const UploadingBar = () => {
  const { user } = useAppContext();
  const [collapsed, setCollapsed] = useState(true);
  const [addPhotoText, setAddPhotoText] = useState(true);
  const handleCollapse = () => {
    setCollapsed(false);
  };

  let postImage = document.getElementById("post-image");
  let inputFile = document.getElementById("input-file");
  let postText = document.getElementById("post-text");
  let form = document.getElementById("form");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  console.log(file);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const postText = e.target.postText.value;

    if (postText.trim() === "" && file === null) {
      alert("Please enter a post text or select an image");
      setUploading(false);
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nextlook_image"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dk6wvv6ts/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url; // Get the URL of the uploaded image
        const post = {
          userId: user._id,
          postText: postText,
          imageUrl: imageUrl,
        };

        const res = await axios.post(`http://localhost:5000/post`, post);
        if (res.data.insertedId) {
          setUploading(false);
          setFile(null);
          form.reset();
          setCollapsed(true);
          setAddPhotoText(true);
          postImage.src = "https://i.postimg.cc/1z29nnMs/noise.jpg";
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
      }
    }
    if (postText.trim() !== "" && !file) {
      const post = {
        userId: user._id,
        postText: postText,
      };

      const res = await axios.post(`http://localhost:5000/post`, post);
      if (res.data.insertedId) {
        setUploading(false);
        setFile(null);
        form.reset();
        setCollapsed(true);
        setAddPhotoText(true);
        postImage.src = "https://i.postimg.cc/1z29nnMs/noise.jpg";
      }
    }

    console.log("Post submitted", e.target.postText.value);
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className={`w-full relative bg-transparentbg overflow-hidden my-5 gap-3 items-start justify-between px-5 py-4 ${
        collapsed ? "rounded-full flex" : " rounded-3xl flex-col"
      }`}
    >
      <div
        className={` gap-3 flex-1 ${collapsed ? "flex" : "flex-col space-y-3"}`}
      >
        <div className="flex items-center gap-3 font-medium">
          <Image
            src={user?.photo || defaultUser}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
          {!collapsed && (
            <>
              <h1>{user?.name}</h1>
              <button
                onClick={() => {
                  setCollapsed(true);
                  setAddPhotoText(true);
                  setFile(null);
                  postImage.src = "https://i.postimg.cc/1z29nnMs/noise.jpg";
                  postText.value = "";
                }}
                className="bg-transparentbg2 absolute right-4 top-4 font-medium rounded-full h-8 w-8 flex items-center justify-center hover:opacity-90 hover:text-red-500 duration-150"
              >
                <IoClose />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center flex-1  gap-3">
          <textarea
            name="postText"
            id="post-text"
            onFocus={handleCollapse}
            type="text"
            placeholder="Tell you friends about your thoughts..."
            className={` resize-none duration-150  py-2  px-4 placeholder:opacity-50  ${
              collapsed
                ? "h-10 rounded-full bg-transparentbg2 w-full"
                : "h-48 w-4/6 rounded-3xl bg-transparent outline-1 outline outline-transparentbg2"
            }`}
          />
          <figure
            className={`bg-transparentbg relative rounded-3xl w-2/6 h-48 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            {addPhotoText && (
              <label
                htmlFor="input-file"
                className="flex hover:text-primary duration-300 absolute top-0 left-0 items-center justify-center w-full h-full gap-1"
              >
                <MdOutlineAddPhotoAlternate className="text-xl" />
                <h1>Add photos</h1>
              </label>
            )}
            {!addPhotoText && (
              <button
                onClick={() => {
                  postImage.src = "https://i.postimg.cc/1z29nnMs/noise.jpg";
                  setAddPhotoText(true);
                  setFile(null);
                }}
                className="bg-transparentbg2 absolute right-2 top-2 font-medium rounded-full h-6 w-6 flex items-center justify-center hover:opacity-90 hover:text-red-500 duration-150"
              >
                <IoClose />
              </button>
            )}
            <img
              id="post-image"
              src="https://i.postimg.cc/1z29nnMs/noise.jpg"
              alt="Post Image"
              className={`w-full h-full object-cover rounded-3xl`}
            />
          </figure>
        </div>
      </div>

      <label
        for="input-file"
        className={`font-medium rounded-full h-10 gap-1 flex items-center justify-center hover:opacity-90 duration-150 ${
          collapsed
            ? "w-10 bg-primary text-background"
            : "w-24 bg-transparentbg2 mt-3"
        }`}
      >
        <BsFillImageFill />
        {!collapsed && <span className="text-sm">Image</span>}
      </label>

      <input
        onChange={() => {
          handleFileChange(event);
          postImage.src = URL.createObjectURL(inputFile.files[0]);
          if (postImage.src !== "https://i.postimg.cc/1z29nnMs/noise.jpg") {
            setAddPhotoText(false);
            setCollapsed(false);
          } else {
            setAddPhotoText(true);
            setFile(null);
            postImage.src = "https://i.postimg.cc/1z29nnMs/noise.jpg";
          }
        }}
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        id="input-file"
        className="hidden"
      />

      {!collapsed && (
        <button
          disabled={uploading}
          className={`bg-primary text-background px-4 py-2 rounded-full text-sm font-medium absolute right-4 bottom-4 ${
            uploading && "animate-pulse"
          }`}
        >
          {!uploading ? "Post" : "Uploading"}
        </button>
      )}
      {
      uploading && <BorderBeam
      duration={10}
      size={100}
      className="from-transparent via-primary to-transparent"
    />
      }
    </form>
  );
};

export default UploadingBar;
