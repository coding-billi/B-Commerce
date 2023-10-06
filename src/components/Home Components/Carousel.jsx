import React from "react";
import img1 from "/Coding/billi-reaction-vite-v8/src/assets/banner/beauty.jpg";
import img2 from "/Coding/billi-reaction-vite-v8/src/assets/banner/books.jpg";
import img3 from "/Coding/billi-reaction-vite-v8/src/assets/banner/gaming.jpg";
import Categories from "./Categories";

export default function Carousel() {
  return (
    <>
      <div
        className="position-relative w-100"
        // style={{ marginTop: "px" }}
      >
        <div style={{ padding: "68px 0 100px 0" }}>
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-interval="1000"
            style={{ height: "100%" }}
          >
            <div className="carousel-inner rounded position-relative">
              <div className="carousel-item active position-relative">
                <img
                  src={img2}
                  className="d-block w-100"
                  style={{ maxHeight: "100%" }}
                  alt="Image 1"
                />
                <div
                  className="position-absolute start-0 end-0 bottom-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, #ffffff)",
                    height: "350px",
                  }}
                ></div>
              </div>
              <div className="carousel-item position-relative">
                <img
                  src={img1}
                  className="d-block w-100"
                  style={{ maxHeight: "100%" }}
                  alt="Image 2"
                />
                <div
                  className="position-absolute start-0 end-0 bottom-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, #ffffff)",
                    height: "350px",
                  }}
                ></div>
              </div>
              <div className="carousel-item position-relative">
                <img
                  src={img3}
                  className="d-block w-100"
                  style={{ maxHeight: "100%" }}
                  alt="Image 3"
                />
                <div
                  className="position-absolute start-0 end-0 bottom-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0), #ffffff", // Adjust the stop point to control the fade intensity
                    height: "350px",
                  }}
                ></div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control">
                <i
                  className="fa-solid fa-chevron-left fa-2xl shadow-lg"
                  style={{ color: "#000000" }}
                ></i>
              </span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control">
                <i
                  className="fa-solid fa-chevron-right fa-2xl shadow-lg"
                  style={{ color: "#000000" }}
                ></i>
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <Categories />
      </div>
    </>
  );
}
