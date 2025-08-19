import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css"; // Import a CSS file for styling

import useSignin from "@/app/hooks/useLogin";
import { AuthContext } from "@/app/Context/AuthContext";
import useChatStore from "@/app/hooks/useMessages";
import { SocketContext } from "@/app/Context/SocketContext";

const Sidebar = ({ setselectedUser, setconversation }) => {
  const { onlineUsers } = useContext(SocketContext);
  const [id, setuserId] = useState(null);
  const [friendslist, setfriendslist] = useState(null);
  const { getfriends } = useSignin();
  const { getMessages } = useChatStore();
  async function getfriendUser() {
    const getUsersFriend = await getfriends();
    setfriendslist(getUsersFriend);
  }

  
  useEffect(() => {
    getfriendUser();
  }, []);

  return (
    <div className="sidebar">
      {
        <ul>
          {friendslist &&
            friendslist.map((user) => (
              <li
                key={user.id}
                className="user-item"
                style={{
                  background: `${
                    id === user.id
                      ? "rgba(255, 255, 255, 0.174)"
                      : "transparent"
                  }`,
                  backdropFilter: `${id === user.id ? "blur(10px)" : ""}`,
                  WebkitBackdropFilter: "blur(50px)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setuserId(user.id);
                  setselectedUser(user);
                  getMessages(user)
                }}
              >
                <div className="recentmsgs">
                  <img
                    alt={user.name}
                    src={user.profilepic}
                    width={500}
                    height={500}
                    className="profile-pic"
                  />
                  {onlineUsers.includes(user.id) && (
                    <span className={`onlineUSers online  `} />
                  )}

                  <span>
                    {user.name} <br />
                    <span
                      style={{
                        fontSize: "0.7rem",
                      }}
                    >
                      {onlineUsers.includes(user.id)?'online':'offline'}
                    </span>
                  </span>
                </div>
              </li>
            ))}
        </ul>
      }
    </div>
  );
};

export default Sidebar;
