import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";
import RatingConfig from "../RatingConfig";
import ImageGallery from "./ImageGallery";
import starFilled from "../../assets/stars/starfilled.png";
import starEmpty from "../../assets/stars/starempty.png";
import starHalf from "../../assets/stars/starhalf.png";
import loader3 from "../../assets/loader3.svg";

export default function SingleProduct() {
  const { fetchProduct, addToCart, getUser } = useContext(Context);

  const [response, setResponse] = useState({ images: [] });
  const [quantityState, setQuantityState] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const { productID } = useParams();

  function addToCartFunc() {
    addToCart(productID, quantityState);
  }

  const handleDecrease = () => {
    if (quantityState > 1) {
      setQuantityState((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantityState((prev) => prev + 1);
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (response.rating >= i) {
      stars.push(
        <img
          key={i}
          src={starFilled}
          style={{ width: "33px", marginRight: "2px" }}
        />
      );
    } else if (response.rating >= i - 0.5) {
      stars.push(
        <img
          key={i}
          src={starHalf}
          style={{ width: "33px", marginRight: "2px" }}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src={starEmpty}
          style={{ width: "33px", marginRight: "2px" }}
        />
      );
    }
  }

  function getMatchingReviewId() {
    if (userInfo._id && response.reviews) {
      for (const review of response.reviews) {
        if (review.user === userInfo._id) {
          return review._id; // Assuming the review object has an _id field
        }
      }
    }
    return null; // No matching review found
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProduct(productID);
      setResponse(data);
    }
    fetchData();
  }, [productID]);

  useEffect(() => {
    async function fetchUserInfo() {
      setUserInfo(await getUser());
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      {response?.store ? (
        <div style={{ margin: "100px" }}>
          <div className="product d-flex">
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "20px" }}
            >
              <div
                style={{
                  height: "400px",
                  width: "400px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {hoveredImage !== null && (
                  <img
                    className="scaled-image"
                    src={response.images[hoveredImage]}
                    alt={`Image ${hoveredImage + 1}`}
                  />
                )}
              </div>
              <ImageGallery
                images={response.images}
                setHoveredImage={setHoveredImage}
                hoveredImage={hoveredImage}
              />
            </div>
            <div className="product-info ms-5 " style={{ width: "800px" }}>
              <h1
                className="product-title-single mt-3 text-left"
                style={{ lineHeight: "30px" }}
              >
                {response.title}
              </h1>
              <div className="d-flex align-items-center mt-3">
                <p className="product-category-single me-3">
                  {response.category}
                </p>
                <p className="product-rating d-flex align-items-center">
                  <RatingConfig product={response} />
                </p>
              </div>
              <div className="d-flex align-items-center product-stock-quantity-single">
                <p className="">{response.stockQuantity} left in stock</p>
                <p className="mx-2">&#8226;</p>
                <p className="">150 sold</p>
              </div>
              <div
                className="position-relative product-price-single my-1"
                style={{ padding: "0 0 0 14px", margin: "0px" }}
              >
                <p className="product-price num-font m-0 fs-1">
                  <small
                    className="position-absolute start-0"
                    style={{ fontSize: "17px", top: "5px" }}
                  >
                    $
                  </small>
                  {response.price}
                </p>
              </div>
              <div
                className="select-quantity d-flex align-items-center justify-content-evenly"
                style={{ width: "80px" }}
              >
                <button className="btn p-2" onMouseDown={handleDecrease}>
                  -
                </button>
                <p className="my-0 mx-2">{quantityState}</p>
                <button className="btn p-2" onMouseDown={handleIncrease}>
                  +
                </button>
              </div>
              <div className="buttons d-flex align-items-center my-3">
                <button
                  className="btn py-2 px-4 fw-semibold btn-warning me-2 text-dark"
                  onClick={addToCartFunc}
                >
                  Add to Cart
                </button>
                {response && (
                  <Link
                    to={`/placeorder/${response.store}/${productID}/${quantityState}`}
                  >
                    <button
                      className="btn py-2 px-4 fw-semibold ms-2 text-light"
                      style={{ backgroundColor: "#003049" }}
                    >
                      Buy Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="product-description" style={{ margin: "100px 0" }}>
            <h5 className="mb-3">About this item</h5>
            <p>
              {response.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Accusamus deleniti odit cumque provident hic
              ipsam voluptatum quam itaque! Nihil provident laudantium
              dignissimos iure explicabo dolorem quis eaque animi, magni autem
              nesciunt numquam quo suscipit unde commodi corrupti tempore
              perferendis soluta nam. Unde itaque obcaecati expedita vel, cumque
              dolore aliquid esse nemo eius cum nisi excepturi, id atque maxime
              voluptates ratione quae culpa perspiciatis explicabo, illum nobis
              dolorum repellendus quidem. Qui deserunt neque autem totam
              accusamus. Laborum cupiditate quidem deleniti illum. Repellat
              expedita sit, adipisci pariatur veniam ipsam sint architecto.
              Alias nesciunt nam minus iusto enim, dolor vel beatae quasi
              obcaecati deserunt. Deleniti impedit ab, ad voluptatum,
              accusantium a veniam iste neque iusto et excepturi! Repudiandae
              magni fugit repellat inventore ipsum consequuntur ab saepe tenetur
              nostrum modi sapiente temporibus dolor, esse quos asperiores
              laudantium. Porro ut optio amet atque dolore blanditiis iure,
              ullam vitae maxime libero labore quo, aperiam beatae quae?
              Temporibus, asperiores qui, eum iste est unde doloremque quae
              magni dolor voluptatibus voluptatem voluptatum perspiciatis vero
              earum distinctio? Veritatis molestiae ipsum sunt nobis omnis
              exercitationem fugit ut laborum inventore dolore vitae rerum
              eaque, dolorem commodi iusto consectetur, ratione placeat. Minus
              eius nam aut vero vel. Debitis perspiciatis neque ratione rem
              fugit voluptatem quo cum qui alias esse maxime, hic, dignissimos
              quibusdam porro labore voluptatibus odio laboriosam, eum ducimus
              repellat nihil! Quia atque ad dignissimos, optio quas labore,
              laboriosam voluptatem officiis cupiditate distinctio perferendis
              harum vitae natus quisquam nostrum provident at veniam dolorum
              expedita perspiciatis eos sed minus consequatur eum? Maiores
              doloribus, odio doloremque optio tempora ullam soluta beatae
              maxime eaque autem, recusandae numquam vitae a! Debitis eveniet
              facilis quisquam velit quam doloribus at veniam ad est sapiente
              corporis totam ut, voluptate, quasi voluptates provident nam
              explicabo recusandae repellendus autem non unde exercitationem.
              Officia voluptas quam saepe ullam pariatur corrupti ad.
            </p>
          </div>
          <div className="rating-and-reviews pb-5">
            <div className="overall-rating d-flex align-items-end">
              <div className="position-relative display-3">
                <span>{response.rating}</span>
                <span
                  className="text-muted position-absolute bottom-0 ms-2"
                  style={{ fontSize: "30px", lineHeight: "60px" }}
                >
                  /5
                </span>
              </div>
            </div>
            <div className="overall-stars mt-2">{stars}</div>
            <p className="review-count my-3" style={{ fontSize: "18px" }}>
              {response.reviews ? response.reviews.length : null} reviews
            </p>
            {userInfo && response.reviews
              ? userInfo.customerOrders &&
                userInfo.customerOrders.some((order) => {
                  return (
                    order.product._id.toString() === productID &&
                    order.progress === "Delivered"
                  );
                }) && (
                  <div className="buttons d-flex my-3">
                    {response.reviews.some(
                      (review) => review.user === userInfo._id
                    ) ? (
                      <div className="update-review-btn">
                        <Link
                          to={`/review/updatereview/${getMatchingReviewId()}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <button className="btn d-flex align-items-center">
                            Update Review
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="new-review-btn">
                        <Link
                          to={`/review/addreview/${response.store}/${productID}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <button className="btn d-flex align-items-center">
                            Add Review
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )
              : null}

            {/* we will also show the review that the current user has done to the very top so he
          can read and update it */}
            {response.reviews ? (
              response.reviews.map((review) => (
                <div className="review mb-5">
                  <div className="card border-0">
                    <div
                      className="card-body"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <div
                          className="img-container  me-2"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <img
                            className="scaled-image"
                            src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                          />
                        </div>
                        <h5 className="card-title">{review.name}</h5>
                      </div>
                      <h6 className="card-subtitle mb-2 d-flex align-items-center">
                        <RatingConfig product={review} />
                      </h6>
                      <p className="card-text">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <img
                src={loader2}
                alt="Loader"
                className="rotate"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={loader3}
            alt="Loader"
            className="rotate"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      )}
    </>
  );
}
