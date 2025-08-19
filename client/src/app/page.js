"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Login from "./Login/Login";
import { AuthContext } from "./Context/AuthContext";
const Nossr = dynamic(() => import("./Main"), { ssr: false });
export default function page() {
  return (
    <>
      {" "}
        <Nossr />
    </>
  );
}
