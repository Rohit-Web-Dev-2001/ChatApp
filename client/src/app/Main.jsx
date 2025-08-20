"use client"
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import { useRouter } from "next/navigation";

const Main = () => {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  if (AuthData) {
    router.push("/Profile");
  }
  router.push("/Login");
};

export default Main;
