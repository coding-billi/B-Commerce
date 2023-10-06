import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import img1 from "../assets/create-store.png";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import dummyImg from "../assets/dummy-img.svg";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";

export default function CreateStore() {
  const { createStore, error, fetchSuccess, loader } = useContext(Context);

  const categoriesVar = [
    "Home",
    "Fitness",
    "Clothing",
    "Electronics",
    "Gaming",
    "Health & Beauty",
    "Books & Stationary",
    "Healthcare & Wellnesss",
  ];

  const countriesArray = [
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Bermuda",
    "Bolivia",
    "Bosnia And Herzegovina",
    "Botswana",
    "Brazil",
    "Bulgaria",
    "Cambodia",
    "Canada",
    "Cayman Islands",
    "Chile",
    "China",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Estonia",
    "Finland",
    "France",
    "French Guiana",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Guadeloupe",
    "Guatemala",
    "Hong Kong",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyzstan",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Malaysia",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Morocco",
    "Namibia",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Saint Barthélemy",
    "Saint Kitts and Nevis",
    "Saint Martin",
    "San Marino",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Tanzania",
    "Thailand",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Zimbabwe",
  ];

  const [inputValues, setInputValues] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setImagePath] = useState("");

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePath(imageUrl); // Save the image URL for preview
    }
  };

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onCheck(e) {
    const { name } = e.target;
    setIsChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function handleClick(e) {
    e.preventDefault();
    createStore(inputValues, isChecked, selectedCountry, imageFile);
  }

  function onSelectChange(e) {
    setSelectedCountry(e.target.value);
  }

  useEffect(() => {
    if (fetchSuccess) {
      window.location.assign("/store");
    }
  }, [fetchSuccess]);

  return (
    <>
      <div>
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
              {error.status === 409 &&
                error.message === "name or email must be unique" &&
                error.error && (
                  <div
                    className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                    role="alert"
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation me-3"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <div>Name or Email must be unique</div>
                  </div>
                )}
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px", width: "100%", height: "100%" }}
            >
              <div
                className="shadow rounded"
                style={{ height: "800px", width: "1300px" }}
              >
                <h1
                  className="fw-bold d-block my-5 mt-4 text-center"
                  style={{ fontFamily: "Poppins" }}
                >
                  Create your Store
                </h1>

                <div
                  className="d-flex justify-content-center"
                  // style={{ marginTop: "100px" }}
                >
                  <div
                    className="d-flex align-items-center me-3"
                    style={{ height: "450px" }}
                  >
                    <img
                      src={img1}
                      className="d-inline-block"
                      style={{
                        height: "300px",
                        borderRadius: "0.25rem 0 0 0.25rem",
                      }}
                    />
                  </div>
                  <form style={{ maxWidth: "700px" }}>
                    <div className="d-flex justify-content-between align-items-center flex-column mb-3">
                      {/* <h3 className="fw-semibold">Store Picture</h3> */}
                      <div
                        className="image-container"
                        style={{
                          backgroundImage: `url(${
                            imagePath ? imagePath : dummyImg
                          })`,
                          width: "100px", // Adjust the width as needed
                          height: "100px", // Adjust the height as needed
                          borderRadius: "50%", // Rounded corners
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInput"
                          onChange={handleImageChange}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                    </div>
                    <input
                      required
                      type="text"
                      name="name"
                      onChange={onChange}
                      className="d-inline-block my-1"
                      placeholder="Store Name"
                      maxLength={60}
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
                      type="email"
                      onChange={onChange}
                      name="bemail"
                      className="d-block my-1"
                      placeholder="Business Email"
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
                    <textarea
                      required
                      type="text"
                      name="description"
                      onChange={onChange}
                      className="d-block my-1"
                      placeholder="Store Description"
                      maxLength={300}
                      style={{
                        height: "100px",
                        padding: "7px 8px",
                        width: "100%",
                        outline: "none",
                        fontFamily: "Poppins",
                        fontSize: "19px",
                        border: "solid 1px lightgray",
                        resize: "none",
                      }}
                    />
                    <input
                      required
                      onChange={onChange}
                      type="number"
                      name="phone"
                      className="my-1 create-store-input"
                      placeholder="Phone Number"
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
                    <select
                      className="form-select text-muted my-1"
                      style={{
                        width: "100%",
                        padding: "10px",
                        height: "50px",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                      }}
                      aria-label="Small select example"
                      onChange={onSelectChange}
                      value={selectedCountry}
                    >
                      <option disabled selected value="">
                        Country
                      </option>
                      {countriesArray.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div
                      className="d-flex flex-wrap justify-content-center my-1"
                      style={{ maxWidth: "500px" }}
                    >
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-100"
                        autoComplete="off"
                      />
                      <label className="btn my-1 mx-1" htmlFor="btn-check-100">
                        All
                      </label>
                      {categoriesVar.map((category) => (
                        <>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={`btn-check-${category}`}
                            autoComplete="off"
                            name={category}
                            onChange={onCheck}
                          />
                          <label
                            className="btn my-1 mx-1"
                            htmlFor={`btn-check-${category}`}
                          >
                            {category}
                          </label>
                        </>
                      ))}
                    </div>
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
                        "Create Store"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/sell" />
        )}
      </div>
    </>
  );
}
