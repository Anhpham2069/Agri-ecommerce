import Home from "./home";
import WishList from "./wishlist";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import CartProtectedRoute from "./auth/CartProtectedRoute";
import { LayoutContext } from "./layout";
import { layoutState, layoutReducer } from "./layout/layoutContext";
import { isAdmin, isAuthenticate } from "./auth/fetchApi";
import PageNotFound from "./layout/PageNotFound";
import ProductDetails from "./productDetails";
import ProductByCategory from "./home/ProductByCategory";
import CheckoutPage from "./order/CheckoutPage";
import ContactUs from "./ContactUs/ContactUs";
import Page from "./page"
import PostPage from "./post/postPage";
import ArticleList from "./post/postList";
import PostDetails from "./post/postDetails";
import allProducts from "./page/Products";
import Newpage from "./page/newpage"
import rescueProduct from "./page/rescueProduct";
import RescuePage from "./page";
import CheckoutSuccessPage from "./order/checkoutSuccessPage";
import AllPostPage from "./post/allPost"
export {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  LayoutContext,
  layoutState,
  layoutReducer,
  isAdmin,
  isAuthenticate,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  ContactUs,
  Page,
  allProducts,
  PostDetails,
  PostPage,
  ArticleList,
  Newpage,
  rescueProduct,
  RescuePage,
  CheckoutSuccessPage,
  AllPostPage,
};
