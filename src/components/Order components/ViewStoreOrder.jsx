import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import RatingConfig from "../RatingConfig";
import loader3 from "../../assets/loader2.svg";

export default function ViewStoreOrder() {
  const { privateStore, fetchStorePrivate, updateOrder, fetchAddress, loader } =
    useContext(Context);

  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  const [progress, setProgress] = useState("");
  const [user, setUser] = useState({});

  const { orderID, quantity } = useParams();

  function handleUpdateOrder(id, progress) {
    updateOrder(id, progress);
  }

  function handleSelectChange(event) {
    setProgress(event.target.value);
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

  async function getStoreInfo() {
    await fetchStorePrivate();
  }

  async function getaddress() {
    privateStore.storeOrders.forEach(async (order) => {
      if (order.orderID === orderID) {
        setAddress(await fetchAddress(order.user._id, order.address));
      }
    });
  }

  useEffect(() => {
    if (privateStore.storeOrders) {
      privateStore.storeOrders.forEach((order) => {
        if (order.orderID === orderID) {
          setOrder(order);
          getaddress();
        }
      });
    }
  }, [privateStore.storeOrders]);

  useEffect(() => {
    if (order) {
      setUser(order.user);
      setProgress(order.progress);
    }
  }, [order]);

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <>
      {privateStore?.bemail &&
        orderID &&
        quantity &&
        (localStorage.getItem("auth-token") ? (
          <div style={{ margin: "100px" }}>
            <div className="grand-div d-flex justify-content-center p-3">
              <div className="left d-flex flex-column me-5">
                <div className="product-preview mb-5 ps-3">
                  {order.product && (
                    <>
                      <div
                        className="product pt-2 d-flex align-items-center"
                        style={{ width: "310px" }}
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
                            <p className="me-2 my-0">quantity: {quantity}</p>
                            <p className="ms-2 my-0">
                              {order.product.category}
                            </p>
                          </div>
                          <div className="d-flex align-items-center m-0 mt-1 p-0">
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
                                {order.product.price}
                              </p>
                            </div>
                            <p className="product-rating mx-3 mt-1 mb-0 d-flex align-items-center">
                              <RatingConfig product={order.product} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="address ">
                  {address && (
                    <div
                      className="rounded pe-3 pb-3 ps-4 pt-4 border position-relative"
                      style={{ height: "250px" }}
                    >
                      <h4 className="mb-3">Delivery Address</h4>
                      <p>{address.name}</p>
                      <div className="card-body mt-1">
                        <p>{address.phone}</p>
                        <p className="card-text">
                          <p className="mb-1">
                            {address.country}, {address.state}, {address.city}
                          </p>
                          {address.area && truncateText(address.area, 30)} ,{" "}
                          {address.address && truncateText(address.address, 50)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="right d-flex flex-column ms-5">
                <div className="user-info">
                  {user && address && (
                    <div
                      className="rounded border p-3 d-flex flex-column"
                      style={{ height: "200px", width: "500px" }}
                    >
                      <h4 className="mb-3">Customer Info</h4>
                      <p>Customer name: {user.name}</p>
                      <div className="card-body mt-1">
                        <p>Customer phone number: {address.phone}</p>
                        <p className="card-text">
                          <p className="mb-1">Customer email: {user.email}</p>
                          <p className="mb-1">
                            Order placed on {formatDate(order.date)}
                          </p>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pricing">
                  {order.product && (
                    <div className="p-3 my-3 border">
                      <div className="d-flex justify-content-between">
                        <p>Selected Quantity: </p>
                        <p>{quantity.toLocaleString()}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Product Price: </p>
                        <p>
                          ${(order.product.price * quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Delivery Charges: </p>
                        <p>$30</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Total Payment: </p>
                        <p>
                          $
                          {(
                            order.product.price * quantity +
                            30
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="order-progress">
                  <div className="d-flex">
                    <select
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      value={progress || ""}
                      onChange={handleSelectChange}
                      id={order._id}
                    >
                      <option selected disabled value="">
                        Update order progress
                      </option>
                      <option value="Getting the Package ready">
                        Getting the Package ready
                      </option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      className="btn btn-dark ms-3"
                      onClick={() => handleUpdateOrder(order.orderID, progress)}
                      style={{ fontSize: "14px", width: "80px" }}
                    >
                      {loader ? (
                        <img
                          src={loader3}
                          alt="Loader"
                          className="rotate"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/store" />
        ))}
    </>
  );
}
