import "./App.css";
import Home from "./components/Home";
import State from "./contexts/State";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/Products";
import ClothingProducts from "./components/Products Components/ClothingProducts";
import FitnessProducts from "./components/Products Components/FitnessProducts";
import BeautyProducts from "./components/Products Components/BeautyProducts";
import BooksProducts from "./components/Products Components/BooksProducts";
import ElectronicsProducts from "./components/Products Components/ElectronicsProducts";
import GamingProducts from "./components/Products Components/GamingProducts";
import HealthcareProducts from "./components/Products Components/HealthcareProducts";
import HomeProducts from "./components/Products Components/HomeProducts";
import FeaturedProducts from "./components/Products Components/FeaturedProducts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Sell from "./components/Sell";
import CreateStore from "./components/CreateStore";
import Store from "./components/Store";
import Cart from "./components/Cart";
import AddProduct from "./components/Store Components/AddProduct";
import UpdateStore from "./components/Store Components/UpdateStore";
import UpdateProduct from "./components/Store Components/UpdateProduct";
import SingleProduct from "./components/Products Components/SingleProduct";
import AddReview from "./components/Reviews/AddReview";
import UpdateReview from "./components/Reviews/UpdateReview";
``;
import Account from "./components/Account";
import NewAddress from "./components/Address Components/NewAddress";
import UpdateAddress from "./components/Address Components/UpdateAddress";
import TotalAndAddress from "./components/Order components/TotalAndAddress";
import ViewStoreOrder from "./components/Order components/ViewStoreOrder";

function App() {
  return (
    <>
      <Router>
        <State>
          <Navbar />
          <Cart />
          <Switch>
            <Route exact path="/store/viewStoreOrder/:orderID/:quantity">
              <ViewStoreOrder />
            </Route>
            <Route exact path="/placeorder/:storeID/:productID/:quantity">
              <TotalAndAddress />
            </Route>
            <Route exact path="/address/updateaddress/:addressID">
              <UpdateAddress />
            </Route>
            <Route exact path="/address/newaddress">
              <NewAddress />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/review/updatereview/:reviewID">
              <UpdateReview />
            </Route>
            <Route exact path="/review/addreview/:storeID/:productID">
              <AddReview />
            </Route>
            <Route exact path="/product/:productID">
              <SingleProduct />
            </Route>
            <Route exact path="/store/updateproduct/:productID">
              <UpdateProduct />
            </Route>
            <Route exact path="/store/updatestore">
              <UpdateStore />
            </Route>
            <Route exact path="/store/newproduct">
              <AddProduct />
            </Route>
            <Route exact path="/store">
              <Store />
            </Route>
            <Route exact path="/sell">
              <Sell />
            </Route>
            <Route exact path="/sell/newseller">
              <CreateStore />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/clothing">
              <ClothingProducts />
            </Route>
            <Route exact path="/products/fitness">
              <FitnessProducts />
            </Route>
            <Route exact path="/products/home">
              <HomeProducts />
            </Route>
            <Route exact path="/products/beauty">
              <BeautyProducts />
            </Route>
            <Route exact path="/products/healthcare">
              <HealthcareProducts />
            </Route>
            <Route exact path="/products/books">
              <BooksProducts />
            </Route>
            <Route exact path="/products/electronics">
              <ElectronicsProducts />
            </Route>
            <Route exact path="/products/gaming">
              <GamingProducts />
            </Route>
            <Route exact path="/products/featured">
              <FeaturedProducts />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          {/* <Footer /> */}
        </State>
      </Router>
    </>
  );
}

export default App;
