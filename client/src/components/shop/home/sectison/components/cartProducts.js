import React ,{useState}from 'react'
import { isWishReq, unWishReq, isWish } from "../../Mixins";
import { useHistory, } from "react-router-dom";


const apiURL = process.env.REACT_APP_API_URL;


const CartProducts = ({data}) => {

    const history = useHistory();


    const [wList, setWlist] = useState(
      JSON.parse(localStorage.getItem("wishList"))
    );
    
//   console.log(data)
  return (
    <div className="market-product" key={data._id} >
        <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
        <svg
                onClick={(e) => isWishReq(e, data._id, setWlist)}
                className={`${
                isWish(data._id, wList) && "hidden"
                } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
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
                onClick={(e) => unWishReq(e, data._id, setWlist)}
                className={`${
                !isWish(data._id, wList) && "hidden"
                } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
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
            <p>-{data.pOffer}%</p>
        </div>
            <img 
            onClick={(e) => history.push(`/products/${data._id}`)}
            src={`${apiURL}/uploads/products/${data.pImages[0]}`}
            alt=""/> 
            <div className='item-product-detail'>
                <h3 className="market-product-title">{data.pName}</h3>
                <h3 className="market-product-company">{data.pCompany}</h3>
                <p className="market-product-description">Số Lượng : {data.pQuantity}</p>
                <div className="market-product-star"> 
            
                        {[...Array(Number(data.pRatingsReviews.map((item)=>(item.rating))))].map((_,key) => {
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
                            {[...Array(5 - Number(data.pRatingsReviews.map((item)=>(item.rating))))].map((_,key) =>
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
                {(data.pPrice-(data.pPrice*(data.pOffer/100))).toLocaleString()}<sup> &#8363;</sup> &nbsp;
                <del>{ Math.ceil(data.pPrice).toLocaleString()}<sup> &#8363;</sup> </del>
            </span>
            </div>     
        </div>
        {/* <button className="add-to-cart-btn codepro-btn codepro-btn-2 hover-slide-right" 
            target="blank" 
            title="Code Pro">
        <span>thêm vào giỏ hàng</span></button> */}
</div>
  )
}

export default React.memo(CartProducts)