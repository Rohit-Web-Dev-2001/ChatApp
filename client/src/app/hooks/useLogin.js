"use client";
import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { API, axios } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { AuthContext } from "../Context/AuthContext";
import { io } from "socket.io-client";

const useSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, AuthData } = useContext(AuthContext);

  const router = useRouter();
  const signin = async (body) => {
    setIsLoading(true);
    try {
      console.log("SignIN api calls") 
      const response = await API.post("auth/SignIn", body);
      const data = response?.data;
      if (data.error) {
        alert(data.error);
        router.push("/");
      } else {
        dispatch({
          type: "LOGIN",
          payload: data,
        });

        router.push("/Profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // LogOut User
  const Logout = () => {
    try {
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Suggestion users

  const Suggestedfriends = async () => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.authorization = `bearer ${AuthData.jwtToken}`;
        return req;
      });

      const response = await API.post(`auth/suggestedFriends`);
      console.log("Suggested Friend Api call");

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (id) => {
    try {
      let body = {
        id: AuthData.userId,
        name: AuthData.Username,
        profilepic: AuthData.profilepic,
      };

      const response = await API.post(`auth/addfriends/${id}`, body);
      return response?.data;
    } catch (error) {}
  };
  const getFriendRequests = async (body) => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.authorization = `bearer ${AuthData.jwtToken}`;
        return req;
      });
      const response = await API.get(`auth/getfriendRequests`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getfriends = async (body) => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.authorization = `bearer ${AuthData.jwtToken}`;
        return req;
      });
      const response = await API.post(`auth/getfriends`);
      console.log("Get friends api call");
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const AcceptFriendRequest = async (id) => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.authorization = `bearer ${AuthData.jwtToken}`;
        return req;
      });
      const response = await API.get(`auth/confirmfriend/${id}`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    Suggestedfriends,
    signin,
    getfriends,
    addFriend,
    getFriendRequests,
    AcceptFriendRequest,
    Logout,
  };
};

export default useSignin;
