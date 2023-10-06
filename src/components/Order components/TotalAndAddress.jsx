import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import RatingConfig from "../RatingConfig";

export default function TotalAndAddress() {
  const { getUser, fetchProduct, placeOrder, loader, fetchSuccess } =
    useContext(Context);

  const [userInfo, setUserInfo] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");

  const { productID, storeID, quantity } = useParams();

  const history = useHistory();

  const handleSelectChange = (event) => {
    setPaymentOption(event.target.value);
  };

  function handleSelectedAddress(id) {
    setSelectedAddress(id);
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  }

  function handleClick() {
    placeOrder(
      { quantity, paymentOption },
      storeID,
      productID,
      selectedAddress
    );
  }

  async function fetchUserAndProductInfo() {
    setUserInfo(await getUser());
    setResponse(await fetchProduct(productID));
  }

  useEffect(() => {
    fetchUserAndProductInfo();
  }, []);

  useEffect(() => {
    if (fetchSuccess) {
      history.push("/account");
    }
  }, [fetchSuccess]);

  return (
    <>
      {response &&
        userInfo &&
        storeID &&
        productID &&
        quantity &&
        (localStorage.getItem("auth-token") ? (
          <div style={{ margin: "100px" }}>
            <div className="grand-div d-flex justify-content-between ">
              <div className="addressbook ">
                {/* displayed to the left */}
                <div className="address-heading ">
                  <h3>Pick a delivery address</h3>
                </div>
                {userInfo && (
                  <div
                    className="address-grid d-grid  mt-3 px-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "400px 400px 400px",
                      columnGap: "50px",
                      rowGap: "50px",
                    }}
                  >
                    {userInfo.addressBook.map((address) => (
                      <div
                        className={`rounded pe-3 pb-3 ps-4 pt-4 custom-shadow position-relative ${
                          selectedAddress === address._id
                            ? "selection-border"
                            : "light-border"
                        }`}
                        onClick={() => handleSelectedAddress(address._id)}
                        key={address._id}
                        style={{
                          cursor: "pointer",
                          userSelect: "none",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        {selectedAddress === address._id && (
                          <>
                            <div className="corner-triangle-div"></div>
                            <i
                              className="fa-solid fa-check check-icon fa-xs"
                              style={{
                                color: "#fff",
                                position: "absolute",
                                top: "11px",
                                left: "3%",
                                transform: "translate(-50%, -50%)",
                              }}
                            ></i>
                          </>
                        )}

                        <p>{address.name}</p>
                        <div className="card-body mt-1">
                          <p>{address.phone}</p>
                          <p className="card-text">
                            <p className="mb-1">
                              {address.country}, {address.state}, {address.city}
                            </p>
                            {truncateText(address.area, 30)} ,{" "}
                            {truncateText(address.address, 50)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="preview-and-total d-flex flex-column">
                {/* displayed to the right */}
                <h3>Payment</h3>
                <div
                  className="product-preview my-4"
                  style={{ height: "210px" }}
                >
                  {response && (
                    <div
                      className="product pt-2 d-flex align-items-center position-relative"
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
                            src={response.images[0]}
                            className="scaled-image"
                          />
                        </div>
                      </div>
                      <div>
                        <h3
                          className="product-title"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {truncateText(response.title, 110)}
                        </h3>
                        <div className="d-flex align-items-center">
                          <p className="me-2 my-0">quantity: {quantity}</p>
                          <p className="ms-2 my-0">{response.category}</p>
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
                              {response.price}
                            </p>
                          </div>
                          <p className="product-rating mx-3 mt-1 mb-0 d-flex align-items-center">
                            <RatingConfig product={response} />
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {response && (
                  <div className="pricing p-2 mb-5">
                    <div className="d-flex justify-content-between">
                      <p>Selected Quantity: </p>
                      <p>{quantity.toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Product Price: </p>
                      <p>${(response.price * quantity).toLocaleString()}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Delivery Charges: </p>
                      <p>$30</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Total Payment: </p>
                      <p>
                        ${(response.price * quantity + 30).toLocaleString()}
                      </p>
                    </div>
                    <div className="">
                      <p>Payment Option</p>
                      <select
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={paymentOption}
                        onChange={handleSelectChange}
                      >
                        <option disabled value="">
                          Select a payment option
                        </option>
                        <option value="Cash on delivery">
                          Cash on delivery
                        </option>
                      </select>
                    </div>
                  </div>
                )}
                {/* <Link
              to={`/placeorder/${storeID}/${productID}/${selectedAddress}/${quantity}`}
            > */}
                <button
                  className="btn btn-warning fw-semibold w-100 py-2"
                  onClick={handleClick}
                >
                  {loader ? (
                    <img
                      src={loader3}
                      alt="Loader"
                      className="rotate"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    "Place Order"
                  )}
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/products" />
        ))}
    </>
  );
}
