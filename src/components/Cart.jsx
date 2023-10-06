import React, { useState, useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import { useHistory } from "react-router-dom";
import RatingConfig from "./RatingConfig";
import cart0 from "../assets/cart0.svg";

export default function Cart() {
  const {
    cart,
    fetchCart,
    removeFromCart,
    localStorageVar,
    fetchStorePrivate,
  } = useContext(Context);

  useEffect(() => {
    if (localStorageVar) {
      fetchStorePrivate();
      fetchCart();
    }
  }, [localStorageVar]);

  function handleClick(e) {
    removeFromCart(e.target.value);
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  }

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {localStorage.getItem("auth-token") ? (
            <div className="d-flex flex-column">
              {cart[0] ? (
                cart.map((item, index) => (
                  <>
                    <div className="product rounded mb-1" key={index}>
                      <div
                        className="product pt-2 d-flex position-relative"
                        key={index}
                      >
                        <div>
                          <div
                            className="me-3"
                            style={{
                              width: "100px",
                              height: "180px",
                              boxSizing: "border-box",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={item.product.images[0]}
                              className="scaled-image "
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="product-title text-left">
                            {truncateText(item.product.title, 155)}
                          </h3>
                          <p className="my-1">quantity: {item.quantity}</p>
                          <div className="d-flex align-items-center m-0 p-0">
                            <div
                              className="position-relative"
                              style={{ padding: "0 0 0 9px", margin: "0px" }}
                            >
                              <p className="product-price num-font m-0 p-0">
                                <small
                                  className="position-absolute start-0 p-0"
                                  style={{ fontSize: "12px", top: "5px" }}
                                >
                                  $
                                </small>
                                {item.product.price}
                              </p>
                            </div>
                            <p className="product-rating mx-3 mt-1 mb-0 d-flex align-items-center">
                              <RatingConfig product={item.product} />
                            </p>
                            {/* <p className="blah mt-1 mb-0">{item.category}</p>*/}
                            <button
                              className="btn fa-regular fa-trash-can p-2 position-absolute end-0 bottom-0"
                              value={item.product._id}
                              onClick={handleClick}
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr
                      className="m-0 my-2"
                      style={{ color: "rgb(120, 120, 120)" }}
                    />
                  </>
                ))
              ) : (
                <>
                  <div className="d-flex justify-content-center text-muted">
                    Cart is empty. Add something to view
                  </div>
                  <div className="d-flex justify-content-center align-items-center h-50">
                    <img
                      src={cart0}
                      style={{ width: "300px", opacity: "0.8" }}
                      className="mt-5"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <p className="text-center mt-5">
                <a href="/login">Login</a> or <a href="/signup">Signup</a> to
                view your cart
              </p>
              <div className="d-flex justify-content-center">
                <a
                  className="btn btn-primary text-light me-1 fw-semibold py-2"
                  href="/login"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="btn btn-warning mx-1 fw-semibold py-2"
                >
                  Sign up
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center h-50">
                <img
                  src={cart0}
                  style={{ width: "300px", opacity: "0.8" }}
                  className="mt-5"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
