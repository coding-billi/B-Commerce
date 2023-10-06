import React from "react";
import starFilled from "/Coding/billi-reaction-vite-v8/src/assets/stars/starfilled.png";
import starEmpty from "/Coding/billi-reaction-vite-v8/src/assets/stars/starempty.png";
import starHalf from "/Coding/billi-reaction-vite-v8/src/assets/stars/starhalf.png";

export default function StarRating() {
  return (
    <div className="star-rating">
      <img src={starFilled} style={{ width: "18px", marginRight: "2px" }} />
      <img src={starFilled} style={{ width: "18px", marginRight: "2px" }} />
      <img src={starHalf} style={{ width: "18px", marginRight: "2px" }} />
      <img src={starEmpty} style={{ width: "18px", marginRight: "2px" }} />
      <img src={starEmpty} style={{ width: "18px", marginRight: "2px" }} />
    </div>
  );
}
