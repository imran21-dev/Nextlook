"use client"; // Needed for Next.js App Router (app directory)

import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data } = useSession();
  const email = data?.user?.email;
  useEffect(() => {
    setLoading(true);
    if (email) {
      axios.get(`http://localhost:5000/user?email=${email}`).then((res) => {
        setUser(res.data);
        setLoading(false);
      });
    }
  }, [email]);

  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  

  const value = { user, setUser, loading, handleSidebar, sidebar };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
