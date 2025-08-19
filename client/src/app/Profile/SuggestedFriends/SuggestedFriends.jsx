"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Css/Style.css";
import useSignin from "@/app/hooks/useLogin";
import { AuthContext } from "@/app/Context/AuthContext";
import Suggestionskelitions from "./Suggestionskelitions";

const SuggestedFriends = () => {
  const { Suggestedfriends, AcceptFriendRequest } = useSignin();

  const { addFriend } = useSignin();
  const [suggestedfriends, setsuggestedfriends] = useState(null);
  const [ImagesSrc, setImageSrc] = useState(null);
  const { AuthData } = useContext(AuthContext);

  async function showSuggestion() {
    const Suggestedfrnds = await Suggestedfriends();
    setsuggestedfriends(Suggestedfrnds);
  }
  const handleAddFriend = async (AddFriendId) => {
    const addfriends = await addFriend(AddFriendId);
    const Suggestedfrnds = await Suggestedfriends();

    setsuggestedfriends(Suggestedfrnds);
  };

  const handleConfirmAddFriend = async (AddFriendId) => {
    const friendrequest = await AcceptFriendRequest(AddFriendId);
    const Suggestedfrnds = await Suggestedfriends();

    setsuggestedfriends(Suggestedfrnds);
  };
  useEffect(() => {
    showSuggestion();
  }, []);

  return (
    <div className={"container"}>
      <h2 className={"heading"}>Suggested For You</h2>
      {suggestedfriends == null ? (
        <Suggestionskelitions />
      ) : (
        <div className={"friendsList"}>
          {suggestedfriends.map((Suggested) => (
            <div key={Suggested.id} className={"friendCard"}>
              <img
                src={Suggested.profilepic}
                alt={"Jhamb"}
                className={"friendImage"}
                width={100}
                height={100}
              />

              <h3 className={"friendName"}>{Suggested.name}</h3>

              {Suggested.status === "pendding" ? (
                <button
                  onClick={() => handleConfirmAddFriend(Suggested.id)}
                  className={`${"addButton"} `}
                >
                  {Suggested.status === "pendding"
                    ? "Confirm Friend"
                    : "Add Friend"}
                </button>
              ) : (
                <button
                  onClick={() => handleAddFriend(Suggested.id)}
                  disabled={Suggested.status === "requested"}
                  className={`${"addButton"} ${
                    Suggested.status ? "disabledButton" : ""
                  }`}
                >
                  {Suggested.status ? "Requested" : "Add Friend"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedFriends;
