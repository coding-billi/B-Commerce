import React, { useContext, useEffect } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import RatingConfig from "../RatingConfig";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProductsGrid() {
  const { fetchAllProductsPublic, products } = useContext(Context);

  useEffect(() => {
    fetchAllProductsPublic();
  }, []);

  return (
    <>
      {products && (
        <div className="grid-div-five">
          {products.map((product, index) => (
            <div key={index} className="column-div ustom-shadow-light">
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
                  <div className="container mt-3">
                    <span className="product-title text-left">
                      {product.title}
                    </span>
                    <div
                      className="position-relative mt-2"
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
                    <span className="product-category">{product.category}</span>

                    <p className="product-rating d-flex align-items-center mt-1">
                      <RatingConfig product={product} />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsGrid;
