"use client";
import React, { useEffect, useState } from "react";
import style from "./Styles/style.css";

import { useRouter } from "next/navigation";
import useSignin from "../hooks/useLogin";

const Login = () => {
  const { isLoading, signin } = useSignin();
  const router = useRouter();
  const [inputs, setinputs] = useState({
    email: " ",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(inputs);
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <div className="form-title">ChatApp</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setinputs({ ...inputs, email: e.target.value });
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setinputs({ ...inputs, password: e.target.value });
              }}
              required
            />
          </div>
          <div className="form-group button">
            <button type="submit" disabled={isLoading}>
              {" "}
              {isLoading ? <div className="spinner"></div> : "Sign In"}
            </button>
          </div>
        </form>
        <div
          className="form-footer"
          style={{
            display: `${isLoading ? "none" : "flex"}`,
          }}
        >
          <a
            onClick={() => {
              router.push("/Signup");
            }}
          >
            Create a new account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
