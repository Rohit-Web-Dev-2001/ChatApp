import React, { useContext } from "react";
import Style from "./Css/Style.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/Context/AuthContext";
import useSignin from "@/app/hooks/useLogin";
import { io } from "socket.io-client";
const Header = ({setUserIndentification}) => {
  const Router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const { Logout } = useSignin();
  const handlelogout = (e) => {
    e.preventDefault();
    Logout();
    setUserIndentification(null)
    Router.push("/Login");
    setTimeout(() => {
      window.location.reload();
    },200);
  };
  return (
    <div className="main-title">
      <p>ChatApp</p>
      <div className="right-container">
        <a
          onClick={(e) => {
            e.preventDefault();
            Router.push("/Profile");
          }}
        >
          Profile
        </a>

        <a
          onClick={(e) => {
            e.preventDefault();
            Router.push("/Messages");
          }}
        >
          Messages
        </a>

        <a
          onClick={(e) => {
            e.preventDefault();
            Router.push("/Notifications");
          }}
        >
          Notifications
        </a>
        <button className="logoutbtn" onClick={handlelogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
