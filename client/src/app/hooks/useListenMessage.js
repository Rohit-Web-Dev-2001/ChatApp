import React, { useContext, useEffect } from "react";
import { SocketContext } from "../Context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessage = () => {
  const { socket } = useContext(SocketContext);
  const { setMessagesZustand, ZustandmessagesArray } = useConversation();
  useEffect(() => {
    socket?.on("newMessages", (newMessage) => {
      setMessagesZustand([...ZustandmessagesArray, newMessage]);
    });
    return () => socket?.off("newMessages");
  }, [socket, ZustandmessagesArray, setMessagesZustand]);
};

export default useListenMessage;
