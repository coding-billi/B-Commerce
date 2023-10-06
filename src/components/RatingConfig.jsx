import React from "react";
import starFilled from "../assets/stars/starfilled.png";
import starEmpty from "../assets/stars/starempty.png";
import starHalf from "../assets/stars/starhalf.png";

export default function RatingConfig({ product }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (product.rating >= i) {
      stars.push(
        <img
          key={i}
          src={starFilled}
          style={{ width: "18px", marginRight: "2px", userSelect: "none" }}
        />
      );
    } else if (product.rating >= i - 0.5) {
      stars.push(
        <img
          key={i}
          src={starHalf}
          style={{ width: "18px", marginRight: "2px", userSelect: "none" }}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src={starEmpty}
          style={{ width: "18px", marginRight: "2px", userSelect: "none" }}
        />
      );
    }
  }

  return (
    <>
      {stars}
      {product.rating !== 0 ? (
        <span className="ms-1 rating-number">{product.rating}</span>
      ) : (
        <span className="ms-1 rating-number">0</span>
      )}
    </>
  );
}
