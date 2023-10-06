import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import {
  Link,
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import logoutImg from "../assets/logout.svg";
import editImg from "../assets/Edit.svg";
import addressImg from "../assets/Address.svg";
import RatingConfig from "./RatingConfig";

export default function Account() {
  const { getUser, deleteAddress } = useContext(Context);

  const history = useHistory();

  const [userInfo, setUserInfo] = useState(null);

  function logOut() {
    localStorage.removeItem("auth-token");
    window.location.reload();
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  }

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  async function handleDelete(e) {
    await deleteAddress(e.target.value);
    await fetchUserInfo();
  }

  async function fetchUserInfo() {
    setUserInfo(await getUser());
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {userInfo &&
        (localStorage.getItem("auth-token") ? (
          <div style={{ marginTop: "100px" }}>
            <h4>Manage Account</h4>
            <Tabs>
              <TabList>
                <Tab>Account Infoformation</Tab>
                <Tab>Address Book</Tab>
                <Tab>Orders</Tab>
              </TabList>

              <TabPanel>
                {userInfo && (
                  <>
                    <div className="px-5 d-flex flex-column">
                      <p>Name: {userInfo.name}</p>
                      <p>Email: {userInfo.email}</p>
                      <a
                        href="/"
                        className="btn py-2 my-3 fw-semibold border border-black d-flex align-items-center"
                        onClick={logOut}
                        style={{ width: "110px" }}
                      >
                        <img
                          src={logoutImg}
                          style={{ width: "14px" }}
                          className="me-2"
                        />
                        Log out
                      </a>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {userInfo && (
                  <div className="px-5 position-relative mb-3">
                    {userInfo.addressBook.length > 0 ? null : (
                      // <span
                      //   style={{ padding: "6px 12px", right: "210px" }}
                      //   className="position-absolute top-0"
                      // >
                      //   {userInfo.addressBook.length} Address
                      //   {userInfo.addressBook.length === 1 ? null : "es"}
                      //   <i className="fa-solid fa-location-dot ms-2"></i>
                      // </span>
                      <>
                        <div className="d-flex align-items-center flex-column">
                          <h4 className="fw-semibold text-center">
                            Your address book is empty
                          </h4>
                          <p className="text-center text-muted m-0">
                            Add a address{" "}
                            <Link to="/address/newaddress">New Address</Link>
                          </p>
                          <img style={{ width: "600px" }} src={addressImg} />
                        </div>
                      </>
                    )}
                    <Link
                      to="/address/newaddress"
                      className="btn position-absolute top-0 end-0 me-5"
                    >
                      New Address
                      <i className="fa-solid fa-plus ms-2 fa-md"></i>
                    </Link>
                  </div>
                )}
                {userInfo && (
                  <>
                    <div className="d-flex justify-content-center">
                      <div
                        className="d-grid px-5 mb-5"
                        style={{
                          gridTemplateColumns: "500px 500px 500px",
                          columnGap: "50px",
                          rowGap: "50px",
                          marginTop: "70px",
                        }}
                      >
                        {userInfo.addressBook.map((address) => (
                          <div
                            className="rounded pe-3 pb-3 ps-4 pt-4 border custom-shadow position-relative"
                            style={{ height: "250px" }}
                          >
                            <p>{address.name}</p>
                            <div className="card-body mt-1">
                              <p>{address.phone}</p>
                              <p className="card-text">
                                <p className="mb-1">
                                  {address.country}, {address.state},{" "}
                                  {address.city}
                                </p>
                                {truncateText(address.area, 30)} ,{" "}
                                {truncateText(address.address, 50)}
                              </p>
                              <div
                                className="position-absolute"
                                style={{ bottom: "5%", right: "5%" }}
                              >
                                <button
                                  className="btn me-3"
                                  onClick={handleDelete}
                                  value={address._id}
                                >
                                  Delete
                                  <i className="fa-regular fa-trash-can ms-2"></i>
                                </button>
                                <Link
                                  to={`/address/updateaddress/${address._id}`}
                                  style={{ color: "inherit" }}
                                >
                                  <button className="btn">
                                    Edit
                                    <img
                                      src={editImg}
                                      style={{
                                        width: "19px",
                                        marginBottom: "2px",
                                      }}
                                      className="ms-1"
                                    />
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                <div className="d-flex flex-column p-3">
                  {userInfo &&
                    userInfo.customerOrders.map((order) => (
                      <>
                        <div
                          className="d-flex justify-content-between align-items-center p-5 mb-3 custom-shadow-light position-relative border"
                          style={{ height: "200px" }}
                        >
                          <div
                            className="product pt-2 d-flex align-items-center"
                            style={{ width: "310px" }}
                          >
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className="me-3"
                                  style={{
                                    width: "100px",
                                    height: "160px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src={order.product.images[0]}
                                    className="scaled-image"
                                  />
                                </div>
                              </div>
                              <div>
                                <h3
                                  className="product-title"
                                  style={{ whiteSpace: "pre-wrap" }}
                                >
                                  {truncateText(order.product.title, 110)}
                                </h3>
                                <div className="d-flex align-items-center">
                                  <p className="me-2 my-0">
                                    quantity: {order.quantity}
                                  </p>
                                  <p className="ms-2 my-0">
                                    {order.product.category}
                                  </p>
                                </div>
                                <div className="d-flex align-items-center m-0 mt-1 p-0">
                                  <div
                                    className="position-relative"
                                    style={{
                                      padding: "0 0 0 9px",
                                      margin: "0px",
                                    }}
                                  >
                                    <p className="product-price num-font m-0 p-0">
                                      <small
                                        className="position-absolute start-0 p-0"
                                        style={{ fontSize: "12px", top: "5px" }}
                                      >
                                        $
                                      </small>
                                      {order.product.price}
                                    </p>
                                  </div>
                                  <p className="product-rating mx-3 mt-1 mb-0 d-flex align-items-center">
                                    <RatingConfig product={order.product} />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <p className="mb-1">
                              Purchased from: {order.store.name}
                            </p>
                            <p className="mb-1">
                              Store Email: {order.store.bemail}
                            </p>
                            <p className="mb-1">
                              Store phone number: {order.store.phone}
                            </p>
                            <p>Order placed on {formatDate(order.date)}</p>
                            <p className="fst-italic fw-semibold">
                              {order.progress}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        ) : (
          <Redirect to="/login" />
        ))}
    </>
  );
}
