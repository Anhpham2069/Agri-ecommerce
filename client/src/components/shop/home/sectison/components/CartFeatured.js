import React from 'react'
import { useHistory } from "react-router-dom";

const apiURL = process.env.REACT_APP_API_URL;
const CartFeatured = ({item,index}) => {

  const history = useHistory();
  
  return (
    <div className='featured-item'  
    key={index}                           
       >
          <img 
          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
          alt=""/>
          <div className='des-item'>
            <p>{item.pName}</p>
            <span className="market-product-price featured-price">
                <del>{ Math.ceil(item.pPrice).toLocaleString()}<sup> &#8363;</sup> </del>
                {(item.pPrice-(item.pPrice*(item.pOffer/100))).toLocaleString()}<sup> &#8363;</sup> &nbsp;
            </span>
          </div>
          <div className='btn-container'>
            <button className='item-btn'
              onClick={(e) => history.push(`/products/${item._id}`)}
            > Mua ngay
              </button>
          </div>
          <div className='featured-offer'>
            -{item.pOffer}%
          </div>
        </div>
  )
}

export default CartFeatured