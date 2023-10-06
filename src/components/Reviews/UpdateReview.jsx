import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";
import reviewImg from "../../assets/review.svg";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "./StarRating";

export default function UpdateReview() {
  const { loader, updateReview, fetchSuccess, fetchReview, error } =
    useContext(Context);

  const [inputValues, setInputValues] = useState({});
  const [rating, setRating] = useState(0);
  const [response, setResponse] = useState({});

  const { reviewID } = useParams();
  const history = useHistory();

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClick(e) {
    e.preventDefault();
    updateReview(rating, inputValues, reviewID);
  }

  useEffect(() => {
    async function getReview() {
      setResponse(await fetchReview(reviewID));
    }
    getReview();
  }, []);

  useEffect(() => {
    if ((response.comment, response.rating)) {
      setInputValues((prev) => ({ ...prev, comment: response.comment }));
      setRating(response.rating);
    }
  }, [response.comment, response.rating]);

  useEffect(() => {
    if (fetchSuccess) {
      history.push(`/product/${response.product}`);
    }
  }, [fetchSuccess]);

  return (
    <>
      {reviewID &&
        (localStorage.getItem("auth-token") ? (
          <>
            <div
              style={{
                position: "fixed",
                top: "70px",
                right: "0",
                left: "0",
                zIndex: "100",
              }}
            >
              {error.status === 401 &&
                error.message === "you are not allowed to write this review" &&
                error.error && (
                  <div
                    className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                    role="alert"
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation me-3"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <div>You are not allowed to write this review</div>
                  </div>
                )}
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px", width: "100%", height: "100%" }}
            >
              <div
                className="shadow rounded"
                style={{ height: "750px", width: "1300px" }}
              >
                <h1
                  className="fw-bold d-block my-5 text-center"
                  style={{ fontFamily: "Poppins" }}
                >
                  Update Review
                </h1>

                <div className="d-flex justify-content-center ">
                  <div
                    className="d-flex align-items-center me-3 "
                    style={{ height: "450px" }}
                  >
                    <img
                      src={reviewImg}
                      className="d-inline-block"
                      style={{
                        height: "300px",
                        borderRadius: "0.25rem 0 0 0.25rem",
                      }}
                    />
                  </div>
                  <form
                    style={{ width: "400px" }}
                    className="d-flex justify-content-center flex-column"
                  >
                    <div className="d-flex align-items-center">
                      <StarRating
                        rating={rating}
                        onRating={(rate) => setRating(rate)}
                      />
                      <p
                        className="m-0 mt-1 ms-2 p-0"
                        style={{ fontSize: "18px" }}
                      >
                        {rating} {rating === 1 ? "star" : "stars"}
                      </p>
                    </div>

                    <textarea
                      required
                      type="text"
                      name="comment"
                      value={inputValues.comment}
                      onChange={onChange}
                      className="d-block my-1"
                      placeholder="Comment"
                      maxLength={1000}
                      style={{
                        height: "200px",
                        padding: "7px 8px",
                        width: "100%",
                        outline: "none",
                        fontFamily: "Poppins",
                        fontSize: "19px",
                        border: "solid 1px lightgray",
                        resize: "none",
                      }}
                    />
                    <button
                      className="btn btn-warning fw-semibold d-block mx-auto w-100 mt-3 py-2"
                      onClick={handleClick}
                      style={{ cursor: loader ? "not-allowed" : null }}
                    >
                      {loader ? (
                        <img
                          src={loader3}
                          alt="Loader"
                          className="rotate"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/" />
        ))}
    </>
  );
}
