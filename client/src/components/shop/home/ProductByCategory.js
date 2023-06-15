import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";
import { isWishReq, unWishReq, isWish } from "./Mixins";
import "./style.css"

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category }) => {
  const history = useHistory();
  

  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-80 md:mx-12 md:mt-40 lg:mt-80">
        <div className="flex justify-between items-center">
          <div className="text-xl flex space-x-3" style={{ fontWeight: "bold" }}>
            <span
              className="hover:text-yellow-700 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span>/</span>
            <span className="text-yellow-700 cursor-default">{category}</span>
          </div>
          <div>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

const AllProduct = () => {
  const history = useHistory();
  
  const [products, setProducts] = useState(null);
  // const [data, setData] = useState(products);
  const { catId } = useParams();
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  
  const uniqueData = [...new Set(products && products.map(data => data.pDetails))];
  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";
    const FilterResult = (cartItem) =>{
      const result = products.filter((currData)=>{
        return currData.pDetails === cartItem;
      })
      setProducts(result)
    }
    console.log(uniqueData)
  return (
    <>
      <Submenu category={category} />
      <div className="product-category-container">
        <div className="filter-product">
        <div onClick={(e)=> setProducts(products)}><p>tất cả</p></div>
          {uniqueData.map((item,index)=>{
            return(
              <div onClick={(e)=>FilterResult(index)} key={index}><p>{item}</p></div>
            )
          })}
     
          {/* <div onClick={(e)=>FilterResult("Gạo")}><p>Gạo</p></div>
          <div onClick={(e)=>FilterResult("đồ ăn liền")}><p>đồ ăn liền</p></div>
          <div onClick={(e)=>FilterResult("Thực phẩm chế biến sẵn")}><p>Thực phẩm chế biến sẵn</p></div>
          <div onClick={(e)=>FilterResult("Rau củ quả")}><p>Rau củ quả</p></div> */}
        </div>
        <div className="product-category">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            return (
               <div className="product-category-item" key={index}>
                            <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                              <svg
                                onClick={(e) => isWishReq(e, item._id, setWlist)}
                                className={`${
                                  isWish(item._id, wList) && "hidden"
                                } w-7 h-7 md:w-7 md:h-7 cursor-pointer text-red-700 transition-all duration-300 ease-in`}
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
                              <svg
                                onClick={(e) => unWishReq(e, item._id, setWlist)}
                                className={`${
                                  !isWish(item._id, wList) && "hidden"
                                } w-7 h-7 md:w-6 md:h-6 cursor-pointer text-red-500 transition-all duration-300 ease-in`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className='item-product'>
                              <div className='offer'>
                                  <p>-{item.pOffer}%</p>
                              </div>
                                <img 
                                onClick={(e) => history.push(`/products/${item._id}`)}
                                src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                                alt=""/> 
                                <div className='item-product-detail'>
                                  <h3 className="market-product-title">{item.pName}</h3>
                                  <h3 className="market-product-company">{item.pCompany}</h3>
                                  {/* <span className="text-gray-700">
                                    {item.pRatingsReviews.length}
                                </span> */}
                                  <p className="market-product-description">Số Lượng : {item.pQuantity}</p>
                                  
                                  <div className="market-product-star"> 
                                  {/* {console.log(item.pRatingsReviews.map((item)=>(item.rating)))} */}
                                  {/* {item.pRatings ? item.pRatings.length : "Không có đánh giá nào"} */}
                                  {/* {Array(item.pRatingsReviews.length).fill().map((_,inex)=>(
                                        <FontAwesomeIcon icon={faStar} key={inex}/>
                                  ))} */}
                        
                                   {[...Array(Number(item.pRatingsReviews.map((item)=>(item.rating))))].map((_,key) => {
                                      return (
                                        <span key={key}>
                                          <svg
                                            className="w-4 h-4 fill-current text-yellow-700"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                        </span>
                                      );
                                    })}
                                     {[...Array(5 - Number(item.pRatingsReviews.map((item)=>(item.rating))))].map((_,key) =>
                                      {
                                    return (
                                      <span key={key}>
                                        <svg
                                          className="w-4 h-4 fill-current text-gray-300"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      </span>
                                    );
                                  })}
                                        </div>
                                  <span className="market-product-price">
                                    {(item.pPrice-(item.pPrice*(item.pOffer/100))).toLocaleString()}<sup> &#8363;</sup> &nbsp;
                                    <del>{ Math.ceil(item.pPrice).toLocaleString()}<sup> &#8363;</sup> </del>
                                  </span>
                                </div>     
                            </div>
                            <button className="add-to-cart-btn codepro-btn codepro-btn-2 hover-slide-right" 
                                target="blank" 
                                title="Code Pro">
                            <span>thêm vào giỏ hàng</span></button>
                        </div>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
            No product found
          </div>
        )}</div>
      </div>
    </>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} />
    </Fragment>
  );
};

const ProductByCategory = (props) => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;
