import React, { useState, useContext, useEffect } from "react";
import img1 from "/Coding/billi-reaction-vite-v8/src/assets/online-shopping-laptop.jpg";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import { useHistory } from "react-router-dom";
import dummyImg from "/Coding/billi-reaction-vite-v8/src/assets/dummy-img.svg";
import loader3 from "/Coding/billi-reaction-vite-v8/src/assets/loader3.svg";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function UpdateProduct() {
  const [response, setResponse] = useState({});

  const {
    updateProduct,
    fetchSuccess,
    fetchProduct,
    loader,
    privateStore,
    fetchStorePrivate,
    error,
  } = useContext(Context);

  const [inputValues, setInputValues] = useState({
    title: response.title,
    description: response.description,
    price: response.price,
    stockQuantity: response.stockQuantity,
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);

  const history = useHistory();
  const { productID } = useParams();

  const handleImageClick = (inputIndex) => {
    document.getElementById(`fileInput${inputIndex}`).click();
  };

  const handleImageChange = (event, inputIndex) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setImagePaths((prevPaths) => {
        const updatedPaths = [...prevPaths];
        updatedPaths[inputIndex] = fileUrls[0];
        return updatedPaths;
      });

      setImageFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[inputIndex] = files[0];
        return updatedFiles;
      });
    }
  };

  function updateProductFunc(e) {
    e.preventDefault();
    updateProduct(productID, inputValues, selectedCategory, imageFiles);
  }

  function onChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSelectChange(e) {
    setSelectedCategory(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProduct(productID);
      setResponse(data);
    }
    fetchData();
    fetchStorePrivate();
  }, []);

  useEffect(() => {
    if (
      (response.title,
      response.description,
      response.price,
      response.stockQuantity,
      response.images)
    ) {
      setInputValues((prev) => ({
        ...prev,
        title: response.title,
        description: response.description,
        stockQuantity: response.stockQuantity,
        price: response.price,
      }));
      setSelectedCategory(response.category);
      setImagePaths(response.images);
      setImageFiles(response.images);
    }
  }, [
    response.title,
    response.description,
    response.price,
    response.stockQuantity,
    response.images,
  ]);

  useEffect(() => {
    if (fetchSuccess) {
      history.push("/store");
    }
  }, [fetchSuccess]);

  return (
    <>
      {privateStore?.bemail &&
        productID &&
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
                error.message === "product or store not found" &&
                error.error && (
                  <div
                    className="alert alert-danger d-flex align-items-center d-flex align-items-center m-0 p-1"
                    role="alert"
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation me-3"
                      style={{ color: "#ff0000" }}
                    ></i>
                    <div>Product or Store not found</div>
                  </div>
                )}
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px", width: "100%", height: "100%" }}
            >
              <div
                className="shadow rounded"
                style={{ height: "750px", width: "1000px" }}
              >
                <h1
                  className="fw-bold d-block my-5 text-center"
                  style={{ fontFamily: "Poppins" }}
                >
                  Update Product
                </h1>

                <div
                  className=" d-flex justify-content-center"
                  style={{ marginTop: "50px" }}
                >
                  <div className="me-5">
                    <img
                      src={img1}
                      className="d-inline-block"
                      style={{
                        height: "350px",
                        borderRadius: "0.25rem 0 0 0.25rem",
                      }}
                    />
                  </div>
                  <form style={{ maxWidth: "350px" }}>
                    <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                      <div
                        className="image-container"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[0] ? imagePaths[0] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("one")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputone"
                          onChange={(e) => handleImageChange(e, 0)}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                      <div
                        className="image-container"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[1] ? imagePaths[1] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("two")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputtwo"
                          onChange={(e) => handleImageChange(e, 1)}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                      <div
                        className="image-container"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[2] ? imagePaths[2] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("three")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputthree"
                          onChange={(e) => handleImageChange(e, 2)}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                      <div
                        className="image-container mt-3"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[3] ? imagePaths[3] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("four")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputfour"
                          onChange={(e) => handleImageChange(e, 3)}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                      <div
                        className="image-container mt-3"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[4] ? imagePaths[4] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("five")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputfive"
                          onChange={(e) => handleImageChange(e, 4)}
                          style={{
                            width: "100px",
                            height: "100px",
                            display: "none",
                          }}
                        />
                      </div>
                      <div
                        className="image-container mt-3"
                        style={{
                          backgroundImage: `url(${
                            imagePaths[5] ? imagePaths[5] : dummyImg
                          })`,
                          width: "100px",
                          height: "100px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick("six")}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          id="fileInputsix"
                          onChange={(e) => handleImageChange(e, 5)}
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
                      onChange={onChange}
                      value={response.title ? inputValues.title : ""}
                      type="text"
                      name="title"
                      className="my-1 mx-1"
                      placeholder="Title"
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
                      onChange={onChange}
                      value={
                        response.description ? inputValues.description : ""
                      }
                      type="text"
                      name="description"
                      className="my-1 mx-1"
                      placeholder="Description"
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
                      onChange={onChange}
                      value={response.price ? inputValues.price : ""}
                      type="number"
                      min={1}
                      name="price"
                      className="my-1 mx-1"
                      placeholder="Price"
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
                      onChange={onChange}
                      value={
                        response.stockQuantity ? inputValues.stockQuantity : ""
                      }
                      type="number"
                      min={1}
                      name="stockQuantity"
                      className="my-1 mx-1"
                      placeholder="Stock Quantity"
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
                      className="form-select text-muted my-1 mx-1"
                      style={{
                        width: "100%",
                        padding: "10px",
                        height: "50px",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                      }}
                      aria-label="Small select example"
                      onChange={onSelectChange}
                      value={selectedCategory}
                    >
                      <option disabled value="">
                        Category
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Home"
                      >
                        Home
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Fitness"
                      >
                        Fitness
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Clothing"
                      >
                        Clothing
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Electronics"
                      >
                        Electronics
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Gaming"
                      >
                        Gaming
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Health & Beauty"
                      >
                        Health & Beauty
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Books & Stationary"
                      >
                        Books & Stationary
                      </option>
                      <option
                        selected={response.category === selectedCategory}
                        value="Healthcare & Wellnesss"
                      >
                        Healthcare & Wellnesss
                      </option>
                    </select>
                    <button
                      className="btn btn-warning fw-semibold d-flex justify-content-center align-items-center mx-1 mt-3 w-100"
                      style={{ cursor: loader ? "not-allowed" : null }}
                      onClick={updateProductFunc}
                    >
                      {loader ? (
                        <img
                          src={loader3}
                          alt="Loader"
                          className="rotate"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        "Update Product"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/store" />
        ))}
    </>
  );
}
