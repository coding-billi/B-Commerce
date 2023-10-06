import React from "react";
import { Link } from "react-router-dom";
import starFilled from "/Coding/billi-reaction-vite-v8/src/assets/stars/starfilled.png";
import starEmpty from "/Coding/billi-reaction-vite-v8/src/assets/stars/starempty.png";

export default function FilterationBar() {
  return (
    <>
      {/* <div
        className="heading fs-3 text-start ms-5"
        style={{ marginTop: "100px" }}
      >
        Filters
        <i
          className="fa-solid fa-sliders fa-xs ms-2"
          style={{ color: "#000000" }}
        ></i>
      </div> */}
      <div
        className="border border-black p-3 fs-5 d-flex justify-content-between"
        style={{ marginTop: "100px" }}
      >
        {/* <div className="ms-3">
          <Link className="nav-link" to="/products">
            All
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/">
            General
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/home">
            Home
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/gaming">
            Gaming
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/electronics">
            Electronics
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/clothing">
            Clothing
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/beauty">
            Health & Beauty
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/healthcare">
            Healthcare & Wellness
          </Link>
        </div>
        <div>
          <Link className="nav-link" to="/products/books">
            Books & Stationary
          </Link>
        </div>
        <div className="me-3">
          <Link className="nav-link" to="/products/fitness">
            Fitness
          </Link>
        </div> */}

        {/* <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by Rating
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item d-flex align-items-center">
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                  className="me-1"
                />
                & up
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center">
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                  className="me-1"
                />
                & up
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center">
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                  className="me-1"
                />
                & up
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center">
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starFilled}
                  style={{ width: "18px", marginRight: "2px" }}
                />
                <img
                  src={starEmpty}
                  style={{ width: "18px", marginRight: "2px" }}
                  className="me-1"
                />
                & up
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
