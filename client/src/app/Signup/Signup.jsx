"use client";
import React, { useEffect, useState } from "react";
import style from "./Styles/style.css";
import useSignup from "../hooks/useSignup";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Signup = () => {
  const { isLoading, signup } = useSignup();
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const [inputs, setinputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: " ",
    password: "",
    profilepic: "",
    gender: "",
  });

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    router.push("/Login");
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <div className="form-title">ChatApp</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group inline">
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => {
                  setinputs({ ...inputs, firstname: e.target.value });
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(e) => {
                  setinputs({ ...inputs, lastname: e.target.value });
                }}
                required
              />
            </div>
          </div>

          <div className="form-group inline">
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => {
                    setinputs({ ...inputs, username: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastname">Select Gender</label>
              <div className="checkbox">
                <input
                  type="radio"
                  name="profilepic"
                  value={"male"}
                  onChange={(e) => {
                    setinputs({ ...inputs, gender: e.target.value });
                  }}
                />
                <label htmlFor="lastname">Male</label>

                <input
                  type="radio"
                  name="profilepic"
                  value={"female"}
                  onChange={(e) => {
                    setinputs({ ...inputs, gender: e.target.value });
                  }}
                />
                <label htmlFor="lastname">Female</label>
              </div>
            </div>
          </div>

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
              {isLoading ? <div className="loader"></div> : "Sign Up"}
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
              router.push("/");
            }}
          >
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
