"use client"
import { BorderBeam } from "@/components/magicui/border-beam";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LuLock } from "react-icons/lu";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const LoginForm = () => {
     const [showPassword, setShowPassword] = useState(false);
      const handlePassword = () => {
        setShowPassword(!showPassword);
      };
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const [spin, setSpin] = useState(false);
      const [open, setOpen] = useState(false);
      const onSubmit = async (data) => {
        setSpin(true);
    
        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
        });
    
        if (response?.error) {
          setSpin(false);
          setOpen(true);
        } else {
          toast("Login Successful! 🚀", {
            description:
              "You're now logged in and ready to explore. Enjoy your experience!",
          });
          setSpin(false);
          setOpen(false);
          redirect("/");
        }
      };
    return (
        <section className="w-full  flex items-center z-50 col-span-3 ">
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
                  })}
                />
              </div>
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
                  })}
                />
                <span
                  onClick={handlePassword}
                  className="opacity-80 hover:bg-transparentbg cursor-pointer duration-150 w-8 h-8 p-2 rounded-full"
                >
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={spin && true}
              className=" cursor-pointer w-full rounded-lg py-2 hover:bg-primary bg-primary-deep text-background font-semibold md:text-sm  text-xs"
            >
              <span className="relative">
                Login{" "}
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
                  <AlertDialogTitle>Invalid email or password</AlertDialogTitle>
                  <AlertDialogDescription className="text-red-500">
                    Oops! The email or password you entered is incorrect. Please
                    check your credentials and try again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => reset()}
                    className="bg-transparentbg"
                  >
                    Try again
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>

          <h2 className="text-center md:text-sm text-xs opacity-80 font-light pt-5">
            Do not have an account?{" "}
            <Link
              href="/signup"
              className="text-primary-deep font-normal hover:underline"
            >
              Sign Up
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

export default LoginForm;