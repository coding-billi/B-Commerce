import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const reviews = [
  {
    rating: 1,
    comment: "Great product! Love it.",
    user: "User1",
  },
  {
    rating: 2,
    comment: "Decent product for the price.",
    user: "User2",
  },
  {
    rating: 3,
    comment: "Decent product for the price.",
    user: "User3",
  },
];

export default function Reviews() {
  return (
    <div className="container mb-5">
      <p className="fs-3 fw-semibold">Feedback</p>
      <div className="reviews">
        <div className="reviews-slide">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div
                className="card card text-dark border-0 shadow"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{review.user}</h5>
                  <StarRating />
                  <p className="card-text">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-slide">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div
                className="card text-dark border-0 shadow"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{review.user}</h5>
                  <StarRating />
                  <p className="card-text">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Home
// electronics
// gaming
// fitness
// clothing
// assesciories
