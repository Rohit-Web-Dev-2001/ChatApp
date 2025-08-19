"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Styles/style.css";
import Sidebar from "../Components/sidebar/Sidebar";
import Messages from "../Components/Messagebox/Messages";
import { useRouter } from "next/navigation";
import { AuthContext } from "../Context/AuthContext";
import Header from "../Components/Header/Header";
import Login from "../Login/Login";
import EmptyMessage from "./EmptyMessageCom";
import useChatStore from "../hooks/useMessages";

const MessagesComp = () => {
  const Router = useRouter();

  const { dispatch, AuthData } = useContext(AuthContext);
  const [selectedUser, setselectedUser] = useState(null);
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    Router.push("/Login");
  };

  return (
    <div className="main-body">
      <div className="main-container">
        <Header />
        <div className="chatbox">
          <Sidebar
            setselectedUser={setselectedUser}
          />
          <div className="messagebox">
            {selectedUser === null ? (
              <EmptyMessage />
            ) : (
              <Messages selectedUser={selectedUser}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesComp;
