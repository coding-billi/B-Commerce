import React, { useState, useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import img1 from "../assets/nature.jpg";
import loader2 from "/Coding/billi-reaction-vite-v8/src/assets/loader2.svg";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function Signup() {
  const { fetchSuccess, login, error, loader } = useContext(Context);

  const [inputValues, setInputValues] = useState({});

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClick(e) {
    e.preventDefault();
    login(inputValues);
  }

  useEffect(() => {
    if (fetchSuccess) {
      window.location.assign("/");
    }
  }, [fetchSuccess]);

  return (
    <>
      {localStorage.getItem("auth-token") ? (
        <Redirect to="/account" />
      ) : (
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
            {error.status === 404 &&
              error.message === "user not found" &&
              error.error && (
                <div
                  className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                  role="alert"
                >
                  <i
                    className="fa-solid fa-triangle-exclamation me-3"
                    style={{ color: "#ff0000" }}
                  ></i>
                  <div>User not found</div>
                </div>
              )}

            {error.status === 401 &&
              error.message === "incorrect password" &&
              error.error && (
                <div
                  className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                  role="alert"
                >
                  <i
                    className="fa-solid fa-triangle-exclamation me-3"
                    style={{ color: "#ff0000" }}
                  ></i>
                  <div>Incorrect password</div>
                </div>
              )}
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "100px", width: "100%", height: "100%" }}
          >
            <div
              className="shadow rounded d-flex align-items-center"
              style={{ height: "600px", width: "1000px", overflow: "hidden" }}
            >
              <div className="h-100 position-relative">
                <img
                  src={img1}
                  className="d-inline-block"
                  style={{
                    width: "510px",
                    borderRadius: "0.25rem 0 0 0.25rem",
                  }}
                />
                <a
                  href="/sell"
                  className="fs-3 position-absolute fw-bold text-light d-flex align-items-center"
                  style={{ bottom: "3%", left: "5%", textDecoration: "none" }}
                >
                  Grow your business today
                  <i
                    className="ms-3 fa-2xs fa-solid fa-arrow-up-right-from-square"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </div>

              <div className="d-flex align-items-center justify-content-center w-100">
                <form>
                  <h1
                    className="fw-bold d-block mb-5"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Login
                  </h1>
                  <input
                    required
                    type="email"
                    name="email"
                    className="d-block my-3"
                    placeholder="Email"
                    onChange={onChange}
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "100%",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <input
                    required
                    type="password"
                    name="password"
                    onChange={onChange}
                    placeholder="Password"
                    maxLength={20}
                    minLength={4}
                    className="d-block my-3"
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "100%",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <button
                    className="btn btn-success fw-semibold  d-flex justify-content-center align-items-center mx-auto mb-5 w-100"
                    onClick={handleClick}
                    style={{ cursor: loader ? "not-allowed" : null }}
                  >
                    {loader ? (
                      <img
                        src={loader2}
                        alt="Loader"
                        className="rotate"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                  <p className="fw-semibold d-inline-block">
                    Don't have an Account?
                  </p>
                  <a href="/signup" className="ms-2 text-dark d-inline-block">
                    Create Account
                  </a>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
