"use client";
import React, { useCallback, useContext, useState, useEffect } from "react";
import Style from "./style.css";
import Image from "next/image";
import { AuthContext } from "@/app/Context/AuthContext";
const ProfileComp = ({ UserIndentification }) => {
  const { AuthData } = useContext(AuthContext);

  return (
    <>
      <div className="pofile-Component">
        <div className="profile-container">
          <div className="profilepic">
            <img
              src={` ${
                UserIndentification
                  ? AuthData.profilepic
                  : "https://static.thenounproject.com/png/55168-200.png"
              }
               
              `}
              // src ={UnkownAuth}
              alt="Profile Picture"
              width={200}
              height={200}
            />
          </div>
          <div className="profile-info">
            {/* {AuthData ? <h1>{AuthData.Username}</h1> : <h1>Unkown</h1>} */}
            <h1> {UserIndentification ? AuthData.Username : "Unknown User"}</h1>

            <div className="stats">
              <div>
                <strong>10</strong>
                <p>Posts</p>
              </div>

              <div>
                <strong>0</strong>
                <p>Friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComp;
