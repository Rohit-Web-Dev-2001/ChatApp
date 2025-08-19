"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Css/Style.css";
import Header from "../Components/Header/Header";
import ProfileComp from "./ProfileComponent/ProfileComp";
import SuggestedFriends from "./SuggestedFriends/SuggestedFriends";
import { AuthContext } from "../Context/AuthContext";
const Profile = () => {
  const { AuthData } = useContext(AuthContext);

  const [UserIndentification, setUserIndentification] = useState(null);
  useEffect(() => {
    setUserIndentification(AuthData.userId);
  }, []);
  return (
    <div className="main-body">
      <div className="main-container">
        <Header setUserIndentification={setUserIndentification} />

        <div>
          {" "}
          <ProfileComp UserIndentification={UserIndentification}/>
        </div>
        <div>
          <SuggestedFriends />
        </div>
      </div>
    </div>
  );
};

export default Profile;
