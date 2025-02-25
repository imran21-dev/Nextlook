"use client";
import { useSession } from "next-auth/react";

const VideosPage = () => {
  const { data: session, status } = useSession();
  console.log(session?.user);
  if (status === "loading") return <p>Loading...</p>;
  if (!session)
    return (
      <p>
        Please <button onClick={() => signIn("google")}>Sign in</button> to view
        this page.
      </p>
    );

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default VideosPage;
