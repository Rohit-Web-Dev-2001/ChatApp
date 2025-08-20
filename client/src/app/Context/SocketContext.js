"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
};

export const SocketContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    case "SET_ONLINE_USERS":
      return { ...state, onlineUsers: action.payload };
    case "CLEAR_SOCKET":
      return { ...state, socket: null, onlineUsers: [] };
    default:
      return state;
  }
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { AuthData } = useContext(AuthContext);

  useEffect(() => {
    if (AuthData) {
      console.log("Sending User Id to Socket", AuthData?.userId);

      const socketInstance = io("https://chatapp-kdac.onrender.com/", {
        query: { userId: AuthData.userId },
        transports: ["websocket"], // force websocket, avoids polling issues
        withCredentials: true,
      });

      dispatch({ type: "SET_SOCKET", payload: socketInstance });

      socketInstance.on("connect", () => {
        console.log("Connected:", socketInstance.id);
      });

      socketInstance.on("getOnlineUsers", (users) => {
        dispatch({ type: "SET_ONLINE_USERS", payload: users });
      });

      return () => {
        socketInstance.close();
        dispatch({ type: "CLEAR_SOCKET" });
      };
    } else {
      if (state.socket) {
        state.socket.close();
        dispatch({ type: "CLEAR_SOCKET" });
      }
    }
  }, [AuthData]);

  return (
    <SocketContext.Provider
      value={{ socket: state.socket, onlineUsers: state.onlineUsers }} 
    >
      {children}
    </SocketContext.Provider>
  );
};
