import React from "react";
import style from "./Css/SuggestionsSkeltion.css";
const Suggestionskelitions = () => {
  return (
    <div className={"Seckletoncontainer"}>
      <div className={"friendsList"}>
        <div className={"friendCard"}>
          {/* Skeleton for Profile Image */}
          <div className={"skeleton friendImageSkeleton"}></div>
          {/* Skeleton for Username */}
          <div className={"skeleton friendNameSkeleton"}></div>
          {/* Skeleton for Button */}
          <div className={"skeleton buttonSkeleton"}></div>
        </div>

        <div className={"friendCard"}>
          {/* Skeleton for Profile Image */}
          <div className={"skeleton friendImageSkeleton"}></div>
          {/* Skeleton for Username */}
          <div className={"skeleton friendNameSkeleton"}></div>
          {/* Skeleton for Button */}
          <div className={"skeleton buttonSkeleton"}></div>
        </div>

        <div className={"friendCard"}>
          {/* Skeleton for Profile Image */}
          <div className={"skeleton friendImageSkeleton"}></div>
          {/* Skeleton for Username */}
          <div className={"skeleton friendNameSkeleton"}></div>
          {/* Skeleton for Button */}
          <div className={"skeleton buttonSkeleton"}></div>
        </div>

      

        
      </div>
    </div>
  );
};

export default Suggestionskelitions;
