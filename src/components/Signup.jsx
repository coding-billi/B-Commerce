import React, { useState, useContext, useEffect } from "react";
import img1 from "../assets/running.png";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import { useHistory } from "react-router-dom";
import loader2 from "/Coding/billi-reaction-vite-v8/src/assets/loader2.svg";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function Signup() {
  const { signup, error, fetchSuccess, loader } = useContext(Context);

  const [inputValues, setInputValues] = useState({});
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClick(e) {
    if (inputValues.password !== inputValues.cpassword) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      signup(inputValues);
    }
  }
  useEffect(() => {
    if (fetchSuccess) {
      history.push("/login");
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
            {passwordError && (
              <div
                className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                role="alert"
              >
                <i
                  className="fa-solid fa-triangle-exclamation me-3"
                  style={{ color: "#ff0000" }}
                ></i>
                <div>Passwords do not match</div>
              </div>
            )}

            {error.status === 409 &&
              error.message === "email already exists" &&
              error.error && (
                <div
                  className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                  role="alert"
                >
                  <i
                    className="fa-solid fa-triangle-exclamation me-3"
                    style={{ color: "#ff0000" }}
                  ></i>
                  <div>Email already exists</div>
                </div>
              )}
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "72px", width: "100%", height: "100%" }}
          >
            <div
              className="shadow rounded d-flex align-items-center"
              style={{ height: "600px", width: "1000px" }}
            >
              <div className="h-100 position-relative">
                <img
                  src={img1}
                  className="d-inline-block"
                  style={{
                    height: "100%",
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
                    Sign up
                  </h1>
                  <input
                    required
                    type="text"
                    name="name"
                    className="d-block my-3"
                    placeholder="Name"
                    onChange={onChange}
                    maxLength={20}
                    minLength={3}
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "300px",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <input
                    required
                    onChange={onChange}
                    type="email"
                    name="email"
                    className="d-block my-3"
                    placeholder="Email"
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "300px",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <input
                    required
                    onChange={onChange}
                    type="password"
                    minLength={4}
                    maxLength={20}
                    name="password"
                    placeholder="Password"
                    className="d-block my-3"
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "300px",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <input
                    required
                    onChange={onChange}
                    type="password"
                    maxLength={20}
                    name="cpassword"
                    placeholder="Confirm Password"
                    className="d-block my-3"
                    style={{
                      height: "50px",
                      padding: "0 8px",
                      width: "300px",
                      outline: "none",
                      fontFamily: "Poppins",
                      fontSize: "19px",
                      border: "solid 1px lightgray",
                    }}
                  />
                  <button
                    className="btn btn-success fw-semibold d-block mx-auto mb-5 w-100 d-flex justify-content-center align-items-center"
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
                      "Sign up"
                    )}
                  </button>
                  <p className="fw-semibold d-inline-block">
                    Already have an Account?
                  </p>
                  <a href="/login" className="ms-2 text-dark d-inline-block">
                    Login
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
