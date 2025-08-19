"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Css/Style.css";
import { useRouter } from "next/navigation";
import Header from "../Components/Header/Header";
import useSignin from "../hooks/useLogin";
const Notifications = () => {
  const [FriendRequests, setFriendRequests] = useState(null);
  const { getFriendRequests, AcceptFriendRequest } = useSignin();
  const handleAcceptFriendReques = async (id) => {
    const friendrequest = await AcceptFriendRequest(id);
    setFriendRequests(friendrequest);
  };
  const binder = async () => {
    const friendrequest = await getFriendRequests();
    setFriendRequests(friendrequest);
  };
  useEffect(() => {
    binder();
  }, []);
  return (
    <div className="main-body">
      <div className="main-container">
        <Header />

        {FriendRequests &&
          FriendRequests.map((Request) => (
            <div className="notificationContainer" key={Request.id}>
              <div className="Container1">
                <div className="profilePic">
                  <img
                    src={Request.profilepic}
                    alt={Request.name}
                    height={200}
                    width={200}
                  />
                </div>
                <div className="notificationText">
                  {Request.name} sent you a friend request
                </div>
              </div>
              <div className="Container2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAcceptFriendReques(Request.id);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
