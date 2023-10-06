import React, { useState } from "react";
import Context from "./Context";

export default function State(props) {
  const [products, setProducts] = useState([]);

  // categories that contain specific products
  const [clothing, setClothing] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [healthcare, setHealthcare] = useState([]);
  const [fitness, setFitness] = useState([]);
  const [home, setHome] = useState([]);
  const [books, setBooks] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loader, setLoader] = useState(false);

  // cart
  const [cart, setCart] = useState([]);

  // private stores
  const [privateStore, setPrivateStore] = useState({});

  // errors for validation
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [error, setError] = useState({});

  let localStorageVar = localStorage.getItem("auth-token");

  async function fetchAllProductsPublic() {
    try {
      setLoader(true);
      const response = await fetch(
        "http://localhost:5000/api/products/fetchAllProductsPublic",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setLoader(false);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProduct(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/fetchProduct/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProductCategories() {
    // reset the categories when fetched again
    setClothing([]);
    setElectronics([]);
    setGaming([]);
    setBeauty([]);
    setHealthcare([]);
    setFitness([]);
    setHome([]);
    setBooks([]);
    setFeaturedProducts([]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/fetchAllProductsPublic",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      data &&
        data.forEach((product) => {
          if (product.category === "Electronics") {
            setElectronics((prev) => [...prev, product]);
          } else if (product.category === "Gaming") {
            setGaming((prev) => [...prev, product]);
          } else if (product.category === "Home") {
            setHome((prev) => [...prev, product]);
          } else if (product.category === "Fitness") {
            setFitness((prev) => [...prev, product]);
          } else if (product.category === "Clothing") {
            setClothing((prev) => [...prev, product]);
          } else if (product.category === "Health & Beauty") {
            setBeauty((prev) => [...prev, product]);
          } else if (product.category === "Healthcare & Wellness") {
            setHealthcare((prev) => [...prev, product]);
          } else if (product.category === "Books & Stationary") {
            setBooks((prev) => [...prev, product]);
          }

          if (product.rating > 4) {
            setFeaturedProducts((prev) => [...prev, product]);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImage(file) {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("sampleFile", file);

      const response = await fetch(`http://localhost:5000/api/upload`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data", // this is not needed for some reason we wil find that out later bro
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });

      const data = await response.json();
      setLoader(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function login(givenData) {
    if (!givenData.email || !givenData.password) {
      return;
    }

    const userInfo = {
      email: givenData.email,
      password: givenData.password,
    };

    try {
      setLoader(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      let data = await response.json();
      setLoader(false);

      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 404) {
        setError({ error: true, status: 404, message: "user not found" });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      if (response.status === 401) {
        setError({ error: true, status: 401, message: "incorrect password" });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      localStorage.setItem("auth-token", data.token);
      localStorageVar === data.token;
      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function signup(givenData) {
    if (
      !givenData.name ||
      !givenData.email ||
      !givenData.password ||
      !givenData.cpassword
    ) {
      return;
    }

    const userInfo = {
      name: givenData.name,
      email: givenData.email,
      password: givenData.password,
      cpassword: givenData.cpassword,
    };

    try {
      setLoader(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      setLoader(false);
      if (response.status === 409) {
        setError({ error: true, status: 409, message: "email already exists" });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      if (response.ok) {
        setFetchSuccess(true);
      }
      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function addToCart(id, quantity) {
    const quantityinfo = {
      quantity: quantity,
    };

    try {
      setLoader(true);

      const response = await fetch(
        `http://localhost:5000/api/cart/addnewitemtocart/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(quantityinfo),
        }
      );

      const data = await response.json();
      setLoader(false);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCart() {
    try {
      setLoader(true);

      const response = await fetch("http://localhost:5000/api/cart/fetchcart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await response.json();
      setLoader(false);
      setCart(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFromCart(id) {
    try {
      setLoader(true);

      const response = await fetch(
        `http://localhost:5000/api/cart/removeitemfromcart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      setLoader(false);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchStorePrivate() {
    try {
      setLoader(true);
      const response = await fetch(
        `http://localhost:5000/api/store/fetchstore`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      setLoader(false);

      setPrivateStore(data);
      setCategories(data.categories);
      setInventory(data.inventory);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStore(id, givenData, country, categories, imageFile) {
    if (
      !givenData.name ||
      !givenData.bemail ||
      !givenData.phone ||
      !givenData.description ||
      !country ||
      !imageFile ||
      !categories ||
      !id
    ) {
      return;
    }

    const storeInfo = {
      name: givenData.name,
      description: givenData.description,
      bemail: givenData.bemail,
      categories: categories,
      country: country,
      phone: givenData.phone,
      Instagram: givenData.Instagram,
      Tiktok: givenData.Tiktok,
      Youtube: givenData.Youtube,
      LinkedIn: givenData.LinkedIn,
      Twitter: givenData.Twitter,
      Facebook: givenData.Facebook,
    };

    setLoader(true);

    const uploadedImageUrl = [];
    if (imageFile instanceof File) {
      // If it's a File object, upload it
      const imageResponse = await uploadImage(imageFile);
      const imageUrl = imageResponse.link;
      uploadedImageUrl.push(imageUrl);
    } else if (typeof imageFile === "string") {
      // If it's a string, add it directly to the images array
      uploadedImageUrl.push(imageFile);
    }

    storeInfo.images = uploadedImageUrl;

    try {
      const response = await fetch(
        `http://localhost:5000/api/store/updatestore/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(storeInfo),
        }
      );

      const data = await response.json();
      setLoader(false);
      fetchStorePrivate();
      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 401) {
        setError({
          error: true,
          status: 401,
          message: "you are not allowed to update this store",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      if (response.status === 404) {
        setError({
          error: true,
          status: 404,
          message: "store not found",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function addProduct(givenData, category, imageFiles) {
    if (
      !givenData.title ||
      !givenData.description ||
      !givenData.price ||
      !givenData.stockQuantity ||
      !category ||
      !imageFiles
    ) {
      return;
    }

    const productInfo = {
      title: givenData.title,
      description: givenData.description,
      category: category,
      price: givenData.price,
      stockQuantity: givenData.stockQuantity,
    };
    setLoader(true);

    const uploadedImageUrls = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const imageResponse = await uploadImage(imageFiles[i]);
      const imageUrl = imageResponse.link;
      uploadedImageUrls.push(imageUrl);
    }
    productInfo.images = uploadedImageUrls;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/addnewproduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(productInfo),
        }
      );

      const data = await response.json();
      setLoader(false);

      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 404) {
        setError({
          error: true,
          status: 404,
          message: "store not found",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id) {
    if (!id) {
      return;
    }

    try {
      setLoader(true);
      const response = await fetch(
        `http://localhost:5000/api/products/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      setLoader(false);

      fetchStorePrivate();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteStore(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/store/deletestore/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function createStore(givenData, categories, country, file) {
    if (
      !givenData.name ||
      !givenData.bemail ||
      !givenData.phone ||
      !givenData.description ||
      !country ||
      !file ||
      !categories
    ) {
      return;
    }

    const selectedCategories = Object.keys(categories)
      .filter((key) => categories[key])
      .map((key) => key);

    setLoader(true);

    const imageResponse = await uploadImage(file);
    const imageUrl = imageResponse.link;

    const storeInfo = {
      name: givenData.name,
      description: givenData.description,
      bemail: givenData.bemail,
      phone: givenData.phone,
      country: country,
      categories: selectedCategories,
      images: [imageUrl],
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/store/createstore`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(storeInfo),
        }
      );

      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 409) {
        setError({
          error: true,
          status: 409,
          message: "name or email must be unique",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      const data = await response.json();
      setLoader(false);

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
      fetchStorePrivate();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateProduct(id, givenData, category, imageFiles) {
    if (
      !givenData.title ||
      !givenData.description ||
      !givenData.price ||
      !givenData.stockQuantity ||
      !category ||
      !imageFiles ||
      !id
    ) {
      return;
    }

    const productInfo = {
      title: givenData.title,
      description: givenData.description,
      category: category,
      price: givenData.price,
      stockQuantity: givenData.stockQuantity,
    };

    setLoader(true);

    const uploadedImageUrls = [];
    // Loop through each item in imageFiles
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      if (imageFile instanceof File) {
        // If it's a File object, upload it
        const imageResponse = await uploadImage(imageFile);
        const imageUrl = imageResponse.link;
        uploadedImageUrls.push(imageUrl);
      } else if (typeof imageFile === "string") {
        // If it's a string, add it directly to the images array
        uploadedImageUrls.push(imageFile);
      }
    }
    productInfo.images = uploadedImageUrls;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(productInfo),
        }
      );

      const data = await response.json();
      setLoader(false);

      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 404) {
        setError({
          error: true,
          status: 404,
          message: "product or store not found",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function newReview(rating, inputValues, storeID, productID) {
    if (!rating || !inputValues.comment || !storeID || !productID) {
      return;
    }
    const reviewInfo = {
      rating: rating,
      comment: inputValues.comment,
    };

    setLoader(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/createreview/${storeID}/${productID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(reviewInfo),
        }
      );

      const data = await response.json();
      setLoader(false);

      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 401) {
        setError({
          error: true,
          status: 401,
          message:
            "you can only review a product if you have bought it and it is delivered",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      if (response.status === 409) {
        setError({
          error: true,
          status: 409,
          message: "you have already reviewed this product",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateReview(rating, inputValues, reviewID) {
    if (!rating || !inputValues.comment || !reviewID) {
      return;
    }
    const reviewInfo = {
      rating: rating,
      comment: inputValues.comment,
    };

    setLoader(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/updatereview/${reviewID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(reviewInfo),
        }
      );

      const data = await response.json();

      setLoader(false);
      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 401) {
        setError({
          error: true,
          status: 401,
          message: "you are not allowed to write this review",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchStoreReviews(storeID) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/fetchstorereviews/${storeID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchReview(reviewID) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/fetchreview/${reviewID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProductReviews(productID) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/fetchproductreviews/${productID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addAddress(givenData) {
    try {
      if (
        !givenData.name ||
        !givenData.country ||
        !givenData.state ||
        !givenData.city ||
        !givenData.area ||
        !givenData.address ||
        !givenData.phone
      ) {
        return;
      }

      setLoader(true);
      const address = {
        name: givenData.name,
        country: givenData.country,
        state: givenData.state,
        city: givenData.city,
        area: givenData.area,
        address: givenData.address,
        phone: givenData.phone,
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/addaddress`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(address),
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        setError({ error: true, status: 404, message: "user not found" });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setLoader(false);
      if (response.ok) {
        setFetchSuccess(true);
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateAddress(givenData, id) {
    try {
      if (
        !givenData.name ||
        !givenData.country ||
        !givenData.state ||
        !givenData.city ||
        !givenData.area ||
        !givenData.address ||
        !givenData.phone ||
        !id
      ) {
        return;
      }
      setLoader(true);
      const address = {
        name: givenData.name,
        country: givenData.country,
        state: givenData.state,
        city: givenData.city,
        area: givenData.area,
        address: givenData.address,
        phone: givenData.phone,
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/updateaddress/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(address),
        }
      );

      const data = await response.json();
      setLoader(false);
      if (response.ok) {
        setFetchSuccess(true);
      }

      if (response.status === 404) {
        setError({
          error: true,
          status: 404,
          message: "user or address not found",
        });
        setTimeout(() => {
          setError({});
        }, 3000);
        return;
      }

      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteAddress(id) {
    try {
      setLoader(true);
      const response = await fetch(
        `http://localhost:5000/api/auth/deleteaddress/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      setLoader(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function placeOrder(givenData, storeID, productID, addressID) {
    try {
      setLoader(true);

      const orderInfo = {
        quantity: givenData.quantity,
        paymentOption: givenData.paymentOption,
      };

      const response = await fetch(
        `http://localhost:5000/api/order/placeorder/${storeID}/${productID}/${addressID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(orderInfo),
        }
      );

      const data = await response.json();
      setLoader(false);
      if (response.ok) {
        setFetchSuccess(true);
      }
      setTimeout(() => {
        setFetchSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOrder(orderID, progress) {
    try {
      if (!progress) {
        return;
      }
      setLoader(true);
      const progressToBeSent = {
        progress: progress,
      };

      const response = await fetch(
        `http://localhost:5000/api/order/updateorder/${orderID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(progressToBeSent),
        }
      );

      const data = await response.json();
      setLoader(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAddress(userID, addressID) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/fetchaddress/${userID}/${addressID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Context.Provider
      value={{
        placeOrder,
        fetchAddress,
        updateOrder,
        addAddress,
        updateAddress,
        deleteAddress,
        getUser,
        fetchReview,
        uploadImage,
        fetchAllProductsPublic,
        fetchProductCategories,
        products,
        deleteStore,
        updateProduct,
        removeFromCart,
        updateStore,
        setProducts,
        healthcare,
        beauty,
        clothing,
        electronics,
        gaming,
        home,
        fitness,
        books,
        featuredProducts,
        signup,
        fetchSuccess,
        login,
        setError,
        error,
        addToCart,
        cart,
        setCart,
        fetchCart,
        createStore,
        localStorageVar,
        fetchStorePrivate,
        setPrivateStore,
        privateStore,
        categories,
        inventory,
        addProduct,
        deleteProduct,
        loader,
        setLoader,
        fetchProduct,
        newReview,
        updateReview,
        fetchStoreReviews,
        fetchProductReviews,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
