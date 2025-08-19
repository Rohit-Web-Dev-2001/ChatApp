"use lcient";
import React, { useContext, useEffect, useState } from "react";
import { API, axios } from "@/utils/utils";
import { AuthContext } from "../Context/AuthContext";
import useConversation from "../zustand/useConversation";

const useChatStore = () => {
  const { AuthData } = useContext(AuthContext);
  const [selectedUser, SetselectedUser] = useState(null);
  const { setMessagesZustand, ZustandmessagesArray } = useConversation();
  const [messages, setmessage] = useState(null);
  const getMessages = async (user) => {
    try {
      API.interceptors.request.use((req) => {
        req.headers.Authorization = `bearer ${AuthData.jwtToken}`;
        return req;
      });
      const res = await API.get(`/message/getmessages/${user.id}`);
      console.log(res?.data);

      setMessagesZustand(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (id, jwtToken, body) => {
    API.interceptors.request.use((req) => {
      req.headers.Authorization = `bearer ${jwtToken}`;
      return req;
    });
    const res = await API.post(`/message/sendMessages/${id}`, body);
    console.log("Sended message",res?.data);
    setMessagesZustand([...ZustandmessagesArray,res?.data]);

  };

  return {
    getMessages,
    sendMessage,
    messages,
    selectedUser,
    SetselectedUser,
    setmessage,
  };
};

export default useChatStore;
