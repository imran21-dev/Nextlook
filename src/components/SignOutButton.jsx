"use client"

import { signOut } from "next-auth/react";

const SignOutButton = () => {
    return <button onClick={()=> signOut()}>Log Out</button>
};

export default SignOutButton;