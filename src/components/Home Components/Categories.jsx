import React from "react";
import card1 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card1.png";
import card2 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card2.png";
import card3 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card3.png";
import card4 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card4.png";
import card5 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card5.png";
import card6 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card6.png";
import card7 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card7.png";
import card9 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card9.png";
import card10 from "/Coding/billi-reaction-vite-v8/src/assets/Categories/card10.png";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div
      className="d-flex justify-content-center align-items-center pt-5 position-absolute flex-wrap"
      style={{
        // background: "linear-gradient(to bottom, transparent, #333533)",
        bottom: "-350px",
      }}
    >
      <div className="me-3">
        <Link to="/products/clothing">
          <img
            src={card1}
            alt="Image 1"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="mx-3">
        <Link to="/products/fitness">
          <img
            src={card2}
            alt="Image 2"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="mx-3">
        <Link to="/products/home">
          <img
            src={card3}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="mx-3">
        <Link to="/products/electronics">
          <img
            src={card4}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="ms-3">
        <Link to="/products/gaming">
          <img
            src={card5}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="my-5 me-4">
        <Link to="/products/beauty">
          <img
            src={card7}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="my-5 mx-4">
        <Link to="/products/books">
          <img
            src={card9}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="my-5 mx-4">
        <Link to="/products/healthcare">
          <img
            src={card10}
            alt="Image 3"
            className="img-fluid shadow categories"
            style={{ borderRadius: "8px", maxWidth: "290.66px" }}
          />
        </Link>
      </div>
      <div className="my-5 ms-4">
        {/* <Link to="/products/home"> */}
        <img
          src={card6}
          alt="Image 3"
          className="img-fluid shadow categories"
          style={{
            borderRadius: "8px",
            maxWidth: "290.66px",
            cursor: "not-allowed",
          }}
        />
        {/* </Link> */}
      </div>
    </div>
  );
}
