import React, { useState, useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import logo from "../assets/LOGO.png";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart, privateStore, getUser } = useContext(Context);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      setUserInfo(await getUser());
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-light bg-light fw-semibold navbar-expand-lg shadow fixed-top nav-color"
        // style={{ color: "#023047" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-3" href="/">
            <img src={logo} className="me-3" width={45} />
            B-Commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sell" className="nav-link">
                  Sell
                </Link>
              </li>
              {localStorage.getItem("auth-token") && privateStore.bemail && (
                // localStorage.getItem("auth-token")
                // privateStore
                <li className="nav-item">
                  <Link to="/store" className="nav-link">
                    Store
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex container-fluid form-styles" role="search">
              <input
                className="nav-color input-styles w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button className="btn-styles" type="submit">
                <i
                  className="fa-solid fa-magnifying-glass fa-xl"
                  style={{ color: "#e5e5e5" }}
                ></i>
              </button>
            </form>
          </div>
          {localStorage.getItem("auth-token") ? (
            <>
              {userInfo && (
                <Link
                  to="/account"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="btn d-flex justify-content-betweem align-items-center p-2"
                    style={{ fontSize: "17px", fontWeight: "500" }}
                  >
                    {/* <img
                      style={{ width: "30px", borderRadius: "50%" }}
                      className="me-2 borderr"
                      src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                    /> */}
                    <i className="fa-solid fa-user me-1" style={{borderRadius: "50%", padding: "5px 6px"}}></i>
                    {userInfo.name}
                  </div>
                </Link>
              )}
            </>
          ) : (
            <>
              <a
                className="btn btn-primary text-light me-1 btn py-2 fw-semibold d-flex align-items-center"
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
            </>
          )}
          <button
            className="btn text-dark border border-black ms-1 fw-semibold d-flex align-items-center ms-3"
            style={{ backgroundColor: "#ffffff65", padding: "10px 20px" }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i
              className="fa-solid fa-cart-shopping fa-md me-2"
              style={{ color: "#495057" }}
            ></i>
            Cart
            <span className="ms-1 text-primary">
              {cart.length ? cart.length : 0}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
