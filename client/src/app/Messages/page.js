"use client";
import React, { useContext, useEffect } from "react";
import MessagesComp from "./MessagesComp";
import { AuthContext } from "../Context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const privateRouter = () => {
    if (!AuthData) {
      router.push("/");
    } else {
      router.push("/Messages");
    }
  };
  useEffect(() => {
    privateRouter();
  },[]);
  return <><MessagesComp /></>;
};

export default page;
