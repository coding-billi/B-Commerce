import React, { useContext, useEffect, useState } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";
import createStoreImg from "/Coding/billi-reaction-vite-v8/src/assets/create-store.png";
import dummyImg from "/Coding/billi-reaction-vite-v8/src/assets/dummy-img.svg";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

export default function UpdateStore() {
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

  const {
    loader,
    fetchSuccess,
    updateStore,
    fetchStorePrivate,
    privateStore,
    categories,
    error,
  } = useContext(Context);

  const [inputValues, setInputValues] = useState({
    name: privateStore.name,
    description: privateStore.description,
    bemail: privateStore.bemail,
    phone: privateStore.phone,
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [categoryCheckedState, setCategoryCheckedState] = useState({});

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

  function handleCheckboxChange(category) {
    setCategoryCheckedState((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  }

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClick(e) {
    e.preventDefault();
    const updatedCategories = Object.keys(categoryCheckedState).filter(
      (category) => categoryCheckedState[category]
    );
    updateStore(
      privateStore._id,
      inputValues,
      selectedCountry,
      updatedCategories,
      imageFile
    );
  }

  function onSelectChange(e) {
    setSelectedCountry(e.target.value);
  }

  useEffect(() => {
    fetchStorePrivate();
  }, []);

  useEffect(() => {
    const initialCategoryCheckedState = {};
    categories.forEach((category) => {
      initialCategoryCheckedState[category] = categories.includes(category);
    });
    setCategoryCheckedState(initialCategoryCheckedState);
  }, [categories]);

  useEffect(() => {
    if (
      (privateStore.name,
      privateStore.name,
      privateStore.description,
      privateStore.bemail,
      privateStore.country,
      privateStore.phone,
      privateStore.images)
    ) {
      setInputValues((prev) => ({
        ...prev,
        name: privateStore.name,
        description: privateStore.description,
        bemail: privateStore.bemail,
        phone: privateStore.phone,
      }));
      setSelectedCountry(privateStore.country);
      setImagePath(privateStore.images[0]);
      setImageFile(privateStore.images[0]);
    }
  }, [
    privateStore.name,
    privateStore.name,
    privateStore.description,
    privateStore.bemail,
    privateStore.phone,
    privateStore.country,
    privateStore.images,
  ]);

  useEffect(() => {
    if (fetchSuccess) {
      window.location.assign("/store");
    }
  }, [fetchSuccess]);

  return (
    <>
      {privateStore?.bemail &&
        (localStorage.getItem("auth-token") ? (
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
                error.message === "store not found" &&
                error.error && (
                  <div
                    className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                    role="alert"
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation me-3"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <div>Store not found</div>
                  </div>
              )}

              {error.status === 401 &&
                error.message === "you are not allowed to update this store" &&
                error.error && (
                  <div
                    className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                    role="alert"
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation me-3"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <div>You are not allowed to update this store</div>
                  </div>
                )}
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px", width: "100%", height: "100%" }}
            >
              <div
                className="shadow rounded"
                style={{ height: "850px", width: "1300px" }}
              >
                <h1
                  className="fw-bold d-block my-5 text-center"
                  style={{ fontFamily: "Poppins" }}
                >
                  Update Store
                </h1>

                <div className="d-flex justify-content-center">
                  <div
                    className="d-flex align-items-center me-3"
                    style={{ height: "450px" }}
                  >
                    <img
                      src={createStoreImg}
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
                      value={privateStore.name ? inputValues.name : ""}
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
                      value={privateStore.bemail ? inputValues.bemail : ""}
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
                      value={
                        privateStore.description ? inputValues.description : ""
                      }
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
                      onChange={onChange}
                      type="number"
                      value={privateStore.phone ? inputValues.phone : ""}
                      name="phone"
                      className="my-1 remove-counter"
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
                      <option disabled value="">
                        Country
                      </option>
                      {countriesArray.map((country, index) => (
                        <option
                          key={index}
                          selected={privateStore.country === country}
                          value={country}
                        >
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
                            onChange={() => handleCheckboxChange(category)}
                            checked={categoryCheckedState[category]}
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
                        "Update Store"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/sell" />
        ))}
    </>
  );
}
