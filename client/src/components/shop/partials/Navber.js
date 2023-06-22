import React, { Fragment, useContext,useEffect,useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ShoppingCartOutlined,UserOutlined,} from "@ant-design/icons"
import 
{ faGear,faPepperHot,faAppleWhole,faSeedling,faCartShopping,faHandshakeAngle,faListUl,faChevronDown,faRightFromBracket,} 
from '@fortawesome/free-solid-svg-icons'
import "./style.css";
import { logout } from "./Action";
import { LayoutContext } from "../index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllProduct } from "../../admin/products/FetchApi";
import { isAdmin } from "../auth/fetchApi";
import DropdownMenu from "./dropdownMenu";
import Search from "./search";
import { NavLink } from "react-router-dom";
import { DashboardUserContext } from "../dashboardUser/Layout";


const Navber = (props) => {
  // const { dataUser } = useContext(DashboardUserContext);
  const history = useHistory();
  const location = useLocation();
  
  const [categories, setCategories] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [ products,setProducts] = useState(false);
  const [dataFetched,] = useState(false);




  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 

  useEffect(() => {
    if(!dataFetched){
      fetchData();
    }
    fetchDataProduct()
  }, [dataFetched]);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataProduct = async () => {
    try {
      let responseData = await getAllProduct();
      setProducts(responseData)
    } catch (error) {
      console.log(error);
    }
  };



  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });


   





  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="navbar top-0 z-40 fixed w-full shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-10 md:my-4 grid grid-cols-4 lg:grid-cols-3 ">
        <div className="hidden lg:block col-span-1 flex  mt-1 ">
            <span
              className=" text-xl font-bold px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Trang chủ
            </span>
            
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch	 items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
            >
              Nông Sản Xanh
            </span>
          </div>
          <div
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center  font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            Nông Sản Xanh
          </div>
          <div className="flex items-center col-span-2 lg:col-span-1 flex justify-end">
            {/* <div> */}
              {/* <Search products={products}/> */}
            {/* </div> */}
            {/*  WishList Page Button */}
            <div
              onClick={(e) => history.push("/wish-list")}
              className=" rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list"
                    ? "fill-current text-gray-700"
                    : ""
                } w-8 h-8  cursor-pointer hover:text-gray-800`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {/* <HeartTwoTone /> */}
            </div>
            
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn  px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  {/* <svg
                    className="cursor-pointer w-8 h-8  hover:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg> */}
                  <div className="user-navber">
                  <UserOutlined />
                  <span className="user-nb-name text-lg">
                      Anh
                    {/* {dataUser.userDetails ? dataUser.userDetails.name : ""} */}
                  </span>
                  </div>
                  
                  <div className="userDropdown absolute mt-1 bg-white rounded">
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-black w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/user/orders")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span>Đơn hàng</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                            <span>Tài khoản</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/wish-list")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </span>
                            <span>Yêu thích</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/setting")}
                            className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span>Cài đặt</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                            <FontAwesomeIcon icon={faRightFromBracket} />

                            </span>
                            <span>Đăng xuất</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/admin/dashboard")}
                            className="flex space-x-2 py-2 px-8 flex items-center text-300 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                            <FontAwesomeIcon icon={faGear} />
                            </span>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            
                            <FontAwesomeIcon icon={faRightFromBracket} />

                            <span>Đăng xuất</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              /* Login Modal Button */
              <div
                onClick={(e) => loginModalOpen()}
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg"
                title="Login"
              >
            
               <div className="user-navber">
                  <span className="text-lg">
                        Đăng nhập                   
                  </span>
                  </div>
              </div>
            )}
            {/* Cart Modal Button */}
            <div
              onClick={(e) => cartModalOpen()}
              className=" px-2 py-2 rounded-lg relative cursor-pointer"
              title="Cart"
            >
              {/* <svg
                className="w-8 h-8  hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg> */}
              <ShoppingCartOutlined style={{fontSize: "1.9rem"}}/>
              <span className="absolute top-0 mt-1  rounded px-1 text-red-400  text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            {/* <span 
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/blog")}
            >
              Blog
            </span> */}
            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact us
            </span>
          </div>
        </div>
        <div className={`my-div ${isHidden ? 'hidden' : ''}`}>
        <ul className="containerMenu flex flex flex-row px-2  text-gray-100 text-sm">
          <li className="menu list hover:bg-green-700 dropdown ">
            <span className="dropdown-btn">
            <FontAwesomeIcon icon={faListUl} />&nbsp;Danh mục sản phẩm &nbsp;  
            </span>
            <DropdownMenu categories={categories} />
          </li>
          <NavLink to="/products/category/6458b1c301a5b61c4cc656bd">

          <li className="menu p-4 px-8 hover:bg-green-700">
            <span>
              {/* <FontAwesomeIcon icon={faCartShopping} size="xs" />&nbsp; */}
              Đi chợ online&nbsp;
            </span>
          </li>
          </NavLink>
          <NavLink to="/products/category/6458b19701a5b61c4cc656b3">
            <li className="menu p-4 px-4 hover:bg-green-700 dropdown">
                <span className="dropdown-btn">
                  {/* <FontAwesomeIcon icon={faAppleWhole} size="xs" />&nbsp; */}
                  Hoa quả &nbsp;
                  {/* <FontAwesomeIcon icon={faChevronDown} size="xs"/> */}
                </span> 
                {/* <DropdownMenu /> */}
            </li>
          </NavLink>
          <NavLink to="/products/category/6458b19701a5b61c4cc656b3">
            <li className="menu p-4 px-4 hover:bg-green-700 dropdown">
              <span className="dropdown-btn">
                  {/* <FontAwesomeIcon icon={faPepperHot} size="xs" /> &nbsp; */}
                  Rau củ &nbsp;
                  {/* <FontAwesomeIcon icon={faChevronDown} size="xs"/> */}
              </span>
              {/* <DropdownMenu /> */}
            </li>
          </NavLink>
          <NavLink to="/products/category/647795a8a6be5512bc83e9a3">

          <li className="menu p-4 px-4 hover:bg-green-700 dropdown">
            <span className="dropdown-btn">
              {/* <FontAwesomeIcon icon={faSeedling} size="xs" /> */}
              &nbsp;Đặc sản &nbsp;
              {/* <FontAwesomeIcon icon={faChevronDown} size="xs"/> */}
            </span>
          {/* <DropdownMenu /> */}
          </li>
          </NavLink>
          <NavLink to="/contact-us">
            <li className="menu p-4 px-4 hover:bg-green-700">
              <span className="dropdown-btn" 
                // onClick={(e) => history.push("")}
              >
                {/* <FontAwesomeIcon icon={faSeedling} size="xs" />&nbsp; */}
                Liên Hệ &nbsp;
              </span>
            {/* <DropdownMenu /> */}
            </li>

          </NavLink>
          <li className="menu p-3 px-4 hover:bg-green-800 text-orange-500 dropdown">
            <span className="dropdown-btn">       
              <FontAwesomeIcon icon={faHandshakeAngle} size="xs" />&nbsp;Giải cứu nông sản &nbsp;
            </span>
          </li>
        </ul>
      </div>
      </nav>
      {/* End Navber Section */}
     
    </Fragment>
  );
};

export default Navber;
