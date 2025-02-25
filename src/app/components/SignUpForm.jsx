"use client"
import { BorderBeam } from "@/components/magicui/border-beam";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { LuLock, LuCircleUser } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import {  useForm } from "react-hook-form";
import { IoIosCheckmark } from "react-icons/io";
import { signIn } from "next-auth/react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState('')
  const [spin, setSpin] = useState(false);
  const password = watch("password", "");
  const requirements = [
    { label: "Minimum 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /\d/ },
    { label: "At least one special character (@$!%*?&)", regex: /[@$!%*?&]/ },
  ];
  const [userNameError, setUserNameError] = useState(false)
  const handleUserName = async (e) => {
    const userName = e.target.value
    await axios.get(`http://localhost:5000/userName?userName=${userName}`)
    .then(res => {
      if (res.data.status) {
        setUserNameError(false)
      }
      else{
        setUserNameError(true)
      }
    })
    
  }
 const onSubmit = async (data) => {
    setSpin(true);

    const response = await fetch(`http://localhost:5000/api/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setSpin(false);

    if (response.ok) {
      toast("Welcome Aboard! 🎉", {
        description: "Account created successfully! Login in now to explore",
        
      })
      reset()
      redirect('/login')
    } else {
      
      setOpen(result.message)
    }
  };
    return (
        <section className="w-full  z-50 col-span-3 ">
        <div className="relative p-10 overflow-hidden bg-transparentbg  w-9/12 mx-auto rounded-2xl">
          <h2 className="text-center opacity-80 font-medium">Continue with</h2>
          <div className="flex gap-5 justify-center py-3">
            <button
              onClick={() => signIn("google")}
              className="text-xs flex items-center gap-1 md:text-sm bg-transparentbg px-12 duration-150 hover:bg-transparentbg2 py-2 rounded-xl "
            >
              <FaGoogle /> Google
            </button>

            <button
              onClick={() => signIn("facebook")}
              className="text-xs flex items-center gap-1 md:text-sm bg-transparentbg px-12  duration-150 hover:bg-transparentbg2 py-2 rounded-xl "
            >
              <FaFacebook /> Facebook
            </button>
          </div>
          <div className="flex items-center gap-4 pb-6">
            <div className="flex-1 h-[1px] bg-transparentbg" />
            <span className="opacity-50">Or</span>
            <div className="flex-1 h-[1px] bg-transparentbg" />
          </div>

          {/* Input fields */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex justify-between gap-3">
              <div className="flex flex-col pb-7 relative  w-2/4">
                <label className="text-xs md:text-sm pb-1">First Name</label>
                <div className="flex items-center bg-transparentbg border border-transparentbg rounded-lg overflow-hidden px-2 gap-2">
                  <RiUserReceivedLine className="opacity-80" />
                  <input
                    type="text"
                    placeholder="Mohammad"
                    className="bg-transparent w-full placeholder:opacity-40 focus:outline-none   py-1 "
                    {...register("firstName", {
                      required: "First name is required",
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "First name must contain only letters",
                      },
                      minLength: {
                        value: 2,
                        message: "Must be at least 2 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Must be at most 20 characters",
                      },
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col pb-7 relative  w-2/4">
                <label className="text-xs md:text-sm pb-1">Last Name</label>
                <div className="flex items-center bg-transparentbg border border-transparentbg rounded-lg overflow-hidden px-2 gap-2">
                  <RiUserSharedLine className="opacity-80" />
                  <input
                    type="text"
                    placeholder="Imran"
                    className="bg-transparent w-full placeholder:opacity-40 focus:outline-none   py-1 "
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Only letters are allowed",
                      },
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </section>

            <div className="flex flex-col pb-7 relative">
              <label className="text-xs md:text-sm pb-1">Username</label>
              <div className="flex items-center bg-transparentbg border border-transparentbg rounded-lg overflow-hidden px-2 gap-2">
                <LuCircleUser className="opacity-80" />
                <input
                  onKeyUp={() => handleUserName(event)}
                  type="text"
                  placeholder="Username"
                  className="bg-transparent w-full placeholder:opacity-40 focus:outline-none   py-1 "
                  {...register("userName", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 characters allowed",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Only letters, numbers, and underscores allowed",
                    },
                  })}
                />
              </div>
              {errors.userName && (
                <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                  {errors.userName.message}
                </p>
              )}
              {userNameError && (
                <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                   Usernae unavaiable
                </p>
              )}
            </div>

            <div className="flex flex-col pb-7 relative">
              <label className="text-xs md:text-sm pb-1">Email</label>
              <div className="flex items-center bg-transparentbg border border-transparentbg rounded-lg overflow-hidden px-2 gap-2">
                <HiOutlineMail className="opacity-80" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent w-full placeholder:opacity-40 focus:outline-none   py-1 "
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col pb-7 relative">
              <label className="text-xs md:text-sm pb-1">Password</label>
              <div className="flex items-center bg-transparentbg border border-transparentbg rounded-lg overflow-hidden px-2 gap-2">
                <LuLock className="opacity-80" />
                <input
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password"
                  className="bg-transparent w-full placeholder:opacity-40 focus:outline-none   py-1 "
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                      message: "Password must meet all requirements",
                    },
                  })}
                />
                <span
                  onClick={handlePassword}
                  className="opacity-80 hover:bg-transparentbg cursor-pointer duration-150 w-8 h-8 p-2 rounded-full"
                >
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 pt-1 absolute bottom-2 text-[10px] md:text-xs">
                  {errors.password.message}
                </p>
              )}
              <div className="pt-2">
                {requirements.map((req, index) => (
                  <p
                    key={index}
                    className={`text-sm flex items-center ${
                      req.regex.test(password)
                        ? "text-primary md:text-xs text-[10px] font-light"
                        : "opacity-60 md:text-xs text-[10px] font-light"
                    }`}
                  >
                    {req.regex.test(password)}
                    <IoIosCheckmark /> {req.label}
                  </p>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={spin && true || userNameError && true}
              className=" cursor-pointer w-full rounded-lg py-2 hover:bg-primary bg-primary-deep text-background font-semibold md:text-sm  text-xs"
            >
              <span className="relative">
                Sign Up{" "}
                {spin && (
                  <ScaleLoader
                    className="absolute top-[2px] w-max -left-10"
                    height={10}
                    width={3}
                  />
                )}
              </span>
            </button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent className="border-transparentbg2">
                <AlertDialogHeader>
                  <AlertDialogTitle > {open}</AlertDialogTitle>
                  <AlertDialogDescription className="text-red-500">
                  An account with this email already exists. Please log in or use a different email to sign up.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => reset()} className="bg-transparentbg">Try again</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
          <h2 className="text-center md:text-sm text-xs opacity-70 font-light pt-5">
            By creating an account, you agree to the{" "}
            <Link
              href="/login"
              className="text-primary-deep font-semibold hover:underline"
            >
              Terms of Service
            </Link>{" "}
            We&apos;ll accasionaly sen you account related emails.
          </h2>
          <h2 className="text-center md:text-sm text-xs opacity-80 font-light pt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-deep font-normal hover:underline"
            >
              Login
            </Link>
          </h2>
          <BorderBeam
            duration={10}
            size={200}
            className="from-transparent via-primary to-transparent"
          />
        </div>
      </section>
    );
};

export default SignUpForm;