import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";

const Main = () => {
  const { AuthData } = useContext(AuthContext);

  return <>{AuthData ? <Profile /> : <Login />}</>;
};

export default Main;
