import React, { useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import { Link } from "react-router-dom";
import RatingConfig from "../RatingConfig";

function FeaturedProducts() {
  const {
    fetchProductCategories,
    featuredProducts,
    clothing,
    electronics,
    gaming,
    beauty,
    healthcare,
    fitness,
    home,
    books,
  } = useContext(Context);

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const firstEightFeaturedProducts = featuredProducts.slice(0, 8);
  const firstEightClothingProducts = clothing.slice(0, 8);
  const firstEightElectronicsProducts = electronics.slice(0, 8);
  const firstEightGamingProducts = gaming.slice(0, 8);
  const firstEightBeautyProducts = beauty.slice(0, 8);
  const firstEightHealthcareProducts = healthcare.slice(0, 8);
  const firstEightFitnessProducts = fitness.slice(0, 8);
  const firstEightHomeProducts = home.slice(0, 8);
  const firstEightBooksProducts = books.slice(0, 8);

  const elementacize = firstEightFeaturedProducts.map((product, index) => {
    return (
      <>
        <div key={index} className="column-div custom-shadow-light">
          <div className="product">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="square-image-container">
                <img
                  src={product.images[0]}
                  className="square-image scaled-image"
                  alt={product.title}
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

                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={product} />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  const elementacizeclothing = firstEightClothingProducts.map(
    (product, index) => {
      return (
        <>
          <div key={index} className="column-div custom-shadow-light">
            <div className="product">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="square-image-container">
                  <img
                    src={product.images[0]}
                    className="square-image scaled-image"
                    alt={product.title}
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

                  <p className="product-rating d-flex align-items-center">
                    <RatingConfig product={product} />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }
  );

  const elementacizeelectronics = firstEightElectronicsProducts.map(
    (product, index) => {
      return (
        <>
          <div key={index} className="column-div custom-shadow-light">
            <div className="product">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="square-image-container">
                  <img
                    src={product.images[0]}
                    className="square-image scaled-image"
                    alt={product.title}
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

                  <p className="product-rating d-flex align-items-center">
                    <RatingConfig product={product} />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }
  );

  const elementacizegaming = firstEightGamingProducts.map((product, index) => {
    return (
      <>
        <div key={index} className="column-div custom-shadow-light">
          <div className="product">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="square-image-container">
                <img
                  src={product.images[0]}
                  className="square-image scaled-image"
                  alt={product.title}
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

                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={product} />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  const elementacizebeauty = firstEightBeautyProducts.map((product, index) => {
    return (
      <>
        <div key={index} className="column-div custom-shadow-light">
          <div className="product">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="square-image-container">
                <img
                  src={product.images[0]}
                  className="square-image scaled-image"
                  alt={product.title}
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

                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={product} />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  const elementacizehealthcare = firstEightHealthcareProducts.map(
    (product, index) => {
      return (
        <>
          <div key={index} className="column-div custom-shadow-light">
            <div className="product">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="square-image-container">
                  <img
                    src={product.images[0]}
                    className="square-image scaled-image"
                    alt={product.title}
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

                  <p className="product-rating d-flex align-items-center">
                    <RatingConfig product={product} />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }
  );

  const elementacizefitness = firstEightFitnessProducts.map(
    (product, index) => {
      return (
        <>
          <div key={index} className="column-div custom-shadow-light">
            <div className="product">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="square-image-container">
                  <img
                    src={product.images[0]}
                    className="square-image scaled-image"
                    alt={product.title}
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

                  <p className="product-rating d-flex align-items-center">
                    <RatingConfig product={product} />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }
  );

  const elementacizehome = firstEightHomeProducts.map((product, index) => {
    return (
      <>
        <div key={index} className="column-div custom-shadow-light">
          <div className="product">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="square-image-container">
                <img
                  src={product.images[0]}
                  className="square-image scaled-image"
                  alt={product.title}
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

                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={product} />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  const elementacizebooks = firstEightBooksProducts.map((product, index) => {
    return (
      <>
        <div key={index} className="column-div custom-shadow-light">
          <div className="product">
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="square-image-container">
                <img
                  src={product.images[0]}
                  className="square-image scaled-image"
                  alt={product.title}
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

                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={product} />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="container mb-5" style={{ marginTop: "400px" }}>
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Featured Products</p>
          <Link
            to="/products/featured"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>

        <div className="d-flex justify-content-center">
          <div className="grid-div-four">{elementacize}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Clothing</p>
          <Link
            to="/products/clothing"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizeclothing}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Electronics</p>
          <Link
            to="/products/electronics"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizeelectronics}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Gaming</p>
          <Link
            to="/products/gaming"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizegaming}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Health & Beauty</p>
          <Link
            to="/products/beauty"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizebeauty}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">
            Healthcare & Wellness
          </p>
          <Link
            to="/products/healthcare"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizehealthcare}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Fitness</p>
          <Link
            to="/products/fitness"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizefitness}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Home</p>
          <Link
            to="/products/home"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizehome}</div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="d-flex container justify-content-between mb-2">
          <p className="fs-3 fw-semibold d-inline-block">Books & Stationary</p>
          <Link
            to="/products/books"
            className="fs-3 fw-semibold d-inline-block text-dark"
          >
            More
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="grid-div-four">{elementacizebooks}</div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
