"use client";
import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Login from "./Login/Login";
import { AuthContext } from "./Context/AuthContext";
import { useRouter } from "next/navigation";
// const Nossr = dynamic(() => import("./Main"), { ssr: false });
export default function page() {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
   useEffect(() => {
    if (AuthData) {
      router.push("/Profile");
    } else {
      router.push("/Login");
    }
  }, [AuthData, router]); // run when AuthData changes
}
