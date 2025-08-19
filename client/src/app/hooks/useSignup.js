"use client";
import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { API, axios } from "@/utils/utils";
import { useRouter } from "next/navigation";
// import { AuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { dispatch } = useContext(AuthContext);

  const signup = async (body) => {
    setIsLoading(true);
    try {
     const response = await API.post("/auth/SignUp", body, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, signup };
};

export default useSignup;
