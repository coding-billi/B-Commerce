import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import dummyImg from "../assets/dummy-img.svg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RatingConfig from "./RatingConfig";
import EditableHeading from "./EditableHeading";
import products0 from "/Coding/billi-reaction-vite-v8/src/assets/products0.svg";
import { Link, Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Store() {
  const {
    privateStore,
    fetchStorePrivate,
    categories,
    inventory,
    deleteProduct,
    deleteStore,
  } = useContext(Context);

  const history = useHistory();

  const [dominantColor, setDominantColor] = useState(null);
  const [lighterDominantColor, setLighterDominantColor] = useState(null);

  function deleteProductFunc(e) {
    deleteProduct(e.target.value);
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

  function deleteStoreFunc() {
    deleteStore(privateStore._id);
    window.location.assign("/");
  }

  function lightenRGBColor(rgbString, percent) {
    const regex = /rgb\((\d+), (\d+), (\d+)\)/;
    const matches = rgbString.match(regex);

    if (matches) {
      const r = parseInt(matches[1]);
      const g = parseInt(matches[2]);
      const b = parseInt(matches[3]);

      const amount = Math.min(100, Math.max(-100, percent)); // Ensure 'amount' is within -100 to 100
      const factor = 1 + amount / 100;

      const newR = Math.min(255, Math.round(r * factor));
      const newG = Math.min(255, Math.round(g * factor));
      const newB = Math.min(255, Math.round(b * factor));

      return `rgb(${newR}, ${newG}, ${newB})`;
    }

    return null; // Return null if the input is not a valid RGB string
  }

  $(function () {
    $(".jquery-color-filler").fillColor();

    // Get the computed background color
    setDominantColor($(".jquery-color-filler").css("background-color"));

    setLighterDominantColor(lightenRGBColor(dominantColor, 70));
  });

  useEffect(() => {
    fetchStorePrivate();
  }, []);

  return (
    <>
      {privateStore?.bemail &&
        (localStorage.getItem("auth-token") ? (
          <div
            className="gradient-container jquery-color-filler"
            style={{
              paddingTop: "400px",
              height: "400px",
              width: "100%",
              // paddingTop: "100px",
              background: `linear-gradient(0deg, #fff 0%, ${lighterDominantColor} 29%, ${dominantColor} 90%)`, // vertical gradient
              // background: "linear-gradient(to left, #ffa62b,  #16697a)",// horixontal gradient
              // backgroundColor: "#e5e5e5",
            }}
          >
            <img src={privateStore.images[0] || dummyImg} className="d-none" />
            <div
              className="pt-5"
              style={{
                // background: "linear-gradient(to bottom, transparent, #fff)",
                backgroundColor: "#fff",
                height: "100%",
              }}
            >
              <div
                className="modal fade"
                id="Delete"
                tabIndex="-1"
                aria-labelledby="DeleteLabel"
                aria-hidden="true"
                z
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5 text-danger fw-semibold"
                        id="DeleteLabel"
                      >
                        <i
                          className="me-2 fa-solid fa-triangle-exclamation fa-sm"
                          style={{ color: "#ff0000" }}
                        ></i>
                        DELETE STORE!
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure to delete this store? This action cannot be
                      undone. Your inventory will be lost and all products will
                      be reset and removed!
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger border border-2 border-dark fw-semibold"
                        value={privateStore._id}
                        onClick={deleteStoreFunc}
                      >
                        Delete Store
                        <i className="ms-3 fa-regular fa-trash-can"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Rating & Reviews</Tab>
                  <Tab>Inventory</Tab>
                  <Tab>Orders</Tab>
                  <Tab>Contact</Tab>
                  <button
                    className="btn position-absolute fw-semibold d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{
                      color: "#383838",
                      right: "50px",
                      cursor: "pointer",
                    }}
                  >
                    Settings
                    <i className="ms-2 fa-solid fa-gear fa-sm"></i>
                  </button>
                  <div className="dropdown">
                    <ul className="dropdown-menu" style={{ width: "170px" }}>
                      <li>
                        <a
                          className="dropdown-item fw-semibold"
                          href="/store/updatestore"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            Update Store
                            <i
                              className="fa-solid fa-pencil"
                              style={{ color: "#383838" }}
                            ></i>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item fw-semibold">
                          Change banner
                        </a>
                      </li>
                      <li>
                        <button
                          className="btn dropdown-item fw-semibold"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#Delete"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            Delete Store
                            <i className="ms-3 fa-regular fa-trash-can"></i>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </TabList>
                <TabPanel>
                  <div className="ms-5">
                    <div className="d-flex align-items-center">
                      <div
                        // className="borderr"
                        style={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          boxSizing: "border-box",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${
                            privateStore.images[0] || dummyImg
                          })`,
                        }}
                      >
                        {/* <img
                        // src={}
                        // className="scaled-image"
                        // style={{objectFit: "cover"}}
                      /> */}
                      </div>
                      <h2 className="fw-bold ms-3">{privateStore.name}</h2>
                    </div>
                    <div className="mt-4">
                      <h5 className="d-inline-block fw-semibold">
                        Store Description:
                      </h5>
                      <h6 className="ms-2 d-block">
                        {privateStore.description}
                      </h6>
                    </div>
                    <h4 className="mt-4 d-inline-block fw-semibold">
                      Sells in:
                    </h4>
                    <div className="mt-2">
                      {categories.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="ms-5">
                    <h1
                      className="fw-bold d-inline-block mb-5"
                      style={{ fontSize: "50px" }}
                    >
                      Overall Rating:
                      <span style={{ fontSize: "55px" }}>4.2</span>
                    </h1>
                    {/* <p className="ms-3 fw-semibold fs-4 d-inline-block">
                  Excellent! Kepp Going! 🚀
                </p> */}
                    <h4 className="fw-semibold">product1 (1)</h4>
                    <div
                      className="reviews"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      }}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        <div
                          className="card-body"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          <h5 className="card-title">User1</h5>
                          <h6 className="card-subtitle mb-2 text-warning borderr">
                            rating stars stars stars
                          </h6>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <h4 className="fw-semibold">product2 (2)</h4>
                    <div
                      className="reviews"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      }}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        <div
                          className="card-body"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          <h5 className="card-title">User1</h5>
                          <h6 className="card-subtitle mb-2 text-warning borderr">
                            rating stars stars stars
                          </h6>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                      <div className="card" style={{ width: "18rem" }}>
                        <div
                          className="card-body"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          <h5 className="card-title">User1</h5>
                          <h6 className="card-subtitle mb-2 text-warning borderr">
                            rating stars stars stars
                          </h6>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <h4 className="fw-semibold">product3 (1)</h4>
                    <div
                      className="reviews"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      }}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        <div
                          className="card-body"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          <h5 className="card-title">User1</h5>
                          <h6 className="card-subtitle mb-2 text-warning borderr">
                            rating stars stars stars
                          </h6>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="w-100 d-flex justify-content-evenly text-dark my-3 borderr p-3 fw-medium fs-5">
                    <p className="m-0">Home</p>
                    <p className="m-0">Fitness</p>
                    <p className="m-0">Clothing</p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <a href="/store/newproduct" className="btn bg-white">
                      <i
                        className="fa-solid fa-circle-plus me-2"
                        style={{ color: "#000000" }}
                      ></i>
                      New Product
                    </a>
                  </div>

                  {inventory[0] ? (
                    <div className="grid-div">
                      {inventory.map((product, index) => (
                        <div key={index} className="mb-2 column-div">
                          <div className="product position-relative">
                            <div className="dropdown">
                              <button
                                className="btn fa-solid fa-ellipsis-vertical"
                                style={{ color: "#333333" }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></button>
                              <ul
                                className="dropdown-menu"
                                style={{ width: "180px" }}
                              >
                                <li>
                                  <Link
                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                    to={`/store/updateproduct/${product._id}`}
                                  >
                                    Edit Product
                                    <i
                                      className="fa-solid fa-pencil"
                                      style={{ color: "#383838" }}
                                    ></i>
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="btn dropdown-item d-flex justify-content-between align-items-center"
                                    value={product._id}
                                    onClick={deleteProductFunc}
                                  >
                                    Delete Product
                                    <i className="fa-regular fa-trash-can"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div
                              style={{
                                width: "300px",
                                height: "300px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={product.images[0]}
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                                // className="img-fluid"
                              />
                            </div>
                            <div className="container">
                              <h3 className="product-title mt-3 text-left">
                                {product.title}
                              </h3>
                              <div
                                className="position-relative"
                                style={{ padding: "0 0 0 9px", margin: "0px" }}
                              >
                                <p className="product-price num-font m-0">
                                  <small
                                    className="position-absolute start-0"
                                    style={{ fontSize: "12px", top: "5px" }}
                                  >
                                    $
                                  </small>
                                  {product.price}
                                </p>
                              </div>
                              <p className="mb-1">{product.category}</p>

                              <p className="product-rating">
                                <RatingConfig product={product} />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <img style={{ width: "300px" }} src={products0} />
                    </div>
                  )}
                </TabPanel>
                <TabPanel>
                  <div className="d-flex flex-column p-3">
                    {privateStore.storeOrders &&
                      privateStore.storeOrders.map((order, index) => (
                        <>
                          <div
                            className="d-flex justify-content-between align-items-center p-5 mb-3 custom-shadow-light position-relative"
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
                                          style={{
                                            fontSize: "12px",
                                            top: "5px",
                                          }}
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
                                user email: {order.user.email}
                              </p>
                              {/* <p className="m-0">
                              user phone number: {order.address.phone}
                            </p> */}
                              <p>Order placed on {formatDate(order.date)}</p>
                              <Link
                                to={`/store/viewStoreOrder/${order.orderID}/${order.quantity}`}
                                className="position-absolute text-dark"
                                style={{
                                  top: "8%",
                                  right: "1%",
                                  fontSize: "17px",
                                }}
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="ms-5">
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.Instagram}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-instagram fa-xl me-2 my-3"
                          style={{ color: "#d00b50" }}
                        ></i>
                        Instagram
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"Instagram"}
                        initialContent={privateStore.Instagram}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.Tiktok}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-tiktok fa-xl me-2 my-3"
                          style={{ color: "#000000" }}
                        ></i>
                        Tiktok
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"Tiktok"}
                        initialContent={privateStore.Tiktok}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.Youtube}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-youtube fa-xl me-2 my-3"
                          style={{ color: "#ff0000" }}
                        ></i>
                        Youtube
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"Youtube"}
                        initialContent={privateStore.Youtube}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.LinkedIn}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-linkedin fa-xl me-2 my-3"
                          style={{ color: "#0d378c" }}
                        ></i>
                        LinkedIn
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"LinkedIn"}
                        initialContent={privateStore.LinkedIn}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.Twitter}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-twitter fa-xl me-2 my-3"
                          style={{ color: "#00b3ff" }}
                        ></i>
                        Twitter
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"Twitter"}
                        initialContent={privateStore.Twitter}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <a
                        className="text-dark"
                        href={privateStore.Facebook}
                        target="_blank"
                      >
                        <i
                          className="fa-brands fa-facebook fa-xl me-2 my-3"
                          style={{ color: "#104d8e" }}
                        ></i>
                        Facebook
                      </a>
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"Facebook"}
                        initialContent={privateStore.Facebook}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <i className="fa-sharp fa-solid fa-phone fa-lg me-2 my-3"></i>
                      {privateStore.phone}
                      <EditableHeading
                        size={16}
                        id={privateStore._id}
                        bold={400}
                        maxLength={200}
                        name={"phone"}
                        initialContent={privateStore.phone}
                        img={privateStore.images[0]}
                      />
                    </div>
                    <div>
                      <i className="fa-solid fa-at fa-lg me-2 my-3"></i>
                      {privateStore.bemail}
                    </div>
                    <h6 className="mt-3 d-inline-block">
                      Based in {privateStore.country}
                    </h6>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        ) : (
          <Redirect to="/sell" />
        ))}
    </>
  );
}