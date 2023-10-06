import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";
import shippingImg from "../../assets/Shipping.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewAddress() {
  const { loader, addAddress, fetchSuccess, error } = useContext(Context);

  const [inputValues, setInputValues] = useState({});

  const history = useHistory();

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleKeyPress(event) {
    const forbiddenKeys = ["-"];

    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  function handleClick(e) {
    e.preventDefault();
    addAddress(inputValues);
  }

  useEffect(() => {
    if (fetchSuccess) {
      history.push("/account");
    }
  }, [fetchSuccess]);

  return (
    <>
      {localStorage.getItem("auth-token") ? (
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
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "100px", width: "100%", height: "100%" }}
          >
            <div
              className="shadow rounded"
              style={{ height: "820px", width: "1300px" }}
            >
              <h1
                className="fw-bold d-block my-5 text-center"
                style={{ fontFamily: "Poppins" }}
              >
                New Address
              </h1>

              <div className="d-flex justify-content-center ">
                <div
                  className="d-flex align-items-center me-5"
                  style={{ height: "450px" }}
                >
                  <img
                    src={shippingImg}
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
                  <input
                    required
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={inputValues.name}
                    placeholder="Address Name"
                    maxLength={40}
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
                  <input
                    required
                    type="tel"
                    name="phone"
                    onKeyDown={handleKeyPress}
                    onChange={onChange}
                    value={inputValues.phone}
                    placeholder="Phone number"
                    minLength={11}
                    maxLength={11}
                    pattern="\d{11}"
                    className="d-block my-3 remove-counter"
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
                    type="text"
                    name="country"
                    onChange={onChange}
                    value={inputValues.country}
                    placeholder="Country"
                    maxLength={15}
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
                  <input
                    required
                    type="text"
                    name="state"
                    onChange={onChange}
                    value={inputValues.state}
                    placeholder="State or Province"
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
                  <input
                    required
                    type="text"
                    name="city"
                    onChange={onChange}
                    value={inputValues.city}
                    placeholder="City"
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
                  <input
                    required
                    type="text"
                    name="area"
                    onChange={onChange}
                    value={inputValues.area}
                    placeholder="Area"
                    maxLength={50}
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
                  <input
                    required
                    type="text"
                    name="address"
                    onChange={onChange}
                    value={inputValues.address}
                    placeholder="House no / building / street / area"
                    maxLength={100}
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
                      "Add Address"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
