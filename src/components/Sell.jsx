import React, { useContext, useEffect } from "react";
import sellImg from "../assets/sell.svg";
import Context from "../contexts/Context";

export default function Sell() {
  const { fetchStorePrivate, privateStore } = useContext(Context);

  useEffect(() => {
    fetchStorePrivate();
  }, []);
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column" style={{ width: "700px" }}>
            <h1 className="fs-1 fw-bold d-block">
              Start Selling on B-Commerce
            </h1>
            <p className="lead d-block ms-3 mt-4" style={{ fontSize: "16px" }}>
              Unlock new opportunities as a seller with us. Join our platform to
              reach a global audience and expand your brand. Benefit from fast
              payouts, a user-friendly interface, and dedicated support. Elevate
              your business and connect with eager shoppers worldwide. Your
              success story starts here.
            </p>
            <div>
              {localStorage.getItem("auth-token") ? (
                privateStore.bemail ? (
                  <a
                    href="/store"
                    className="btn-primary btn border-0 fw-semibold shadow mt-2 ms-2"
                    style={{
                      padding: "10px",
                      width: "160px",
                      borderRadius: "40px",
                    }}
                  >
                    Go to my Store
                  </a>
                ) : (
                  <a
                    href="/sell/newseller"
                    className="btn-primary btn fw-semibold shadow mt-2 ms-3"
                    style={{
                      padding: "10px",
                      width: "140px",
                      borderRadius: "40px",
                    }}
                  >
                    Start Selling
                  </a>
                )
              ) : (
                <>
                  <a
                    href="/signup"
                    className="btn-primary btn fw-semibold shadow mt-2 me-3"
                    style={{
                      padding: "10px",
                      width: "140px",
                      borderRadius: "40px",
                    }}
                  >
                    Sign up
                  </a>
                  <a
                    href="/login"
                    className="btn-warning btn fw-semibold shadow mt-2"
                    style={{
                      padding: "10px",
                      width: "140px",
                      borderRadius: "40px",
                    }}
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
          <img style={{ width: "900px" }} src={sellImg} />
        </div>
      </div>
    </>
  );
}
