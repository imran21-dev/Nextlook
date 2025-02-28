
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="text-center">
     {/* <h1>Welcome, {session.user.name}!</h1>
     <p>Email: {session.user.email}</p>

     <SignOutButton/> */}
     ssss
    </div>
  );
}
