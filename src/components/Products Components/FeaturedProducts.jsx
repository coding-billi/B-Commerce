import React, { useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import RatingConfig from "../RatingConfig";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function FeaturedProducts() {
  const { fetchProductCategories, featuredProducts } = useContext(Context);

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <div className="grid-div-five">
      {featuredProducts.map((product, index) => (
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
      ))}
    </div>
  );
}
