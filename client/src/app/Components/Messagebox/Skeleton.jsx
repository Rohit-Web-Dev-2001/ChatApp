import React from "react";
import SkeletonStyle from "./Css/SekletonStyle.css";
const Skeleton = () => {
  return (
  <>
    <div className="chat-container">
      <div className="Skeletonmessage skeleton short received"></div>
      <div className="Skeletonmessage skeleton long sent"></div>
      <div className="Skeletonmessage skeleton long received"></div>
      <div className="Skeletonmessage skeleton short sent"></div>
    </div>  <div className="chat-container">
      <div className="Skeletonmessage skeleton short received"></div>
      <div className="Skeletonmessage skeleton long sent"></div>
      <div className="Skeletonmessage skeleton long received"></div>
      <div className="Skeletonmessage skeleton short sent"></div>
    </div>  <div className="chat-container">
      <div className="Skeletonmessage skeleton short received"></div>
    </div>
  </>
  );
};

export default Skeleton;
