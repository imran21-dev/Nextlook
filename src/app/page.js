import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  

  return (
    <div className="text-primary">
     {/* <Navbar></Navbar> */}
     <h1>Welcome, {session?.user.name}!</h1>
     <p>Email: {session?.user.email}</p>

     <SignOutButton/>
    </div>
  );
}
