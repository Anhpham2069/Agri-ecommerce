import React from 'react';
import { useHistory } from "react-router-dom";


const apiURL = process.env.REACT_APP_API_URL;
const ProductList = ( {products,searchValue,active,show} ) => {
    const history = useHistory();
  return (
    // <ul className= {active ? "search-list-item-none" : "search-list-item"}>
    <ul className= "search-list-item">
    {products && show ? products.filter((product)=>product.pName.toLowerCase().includes(searchValue))
    .map((product) => {
      return(
          <li key={product._id} className="search-item"
                    onClick={(e) => history.push(`/products/${product._id}`)}
          >
            <img 
            src={`${apiURL}/uploads/products/${product.pImages[0]}`} alt='anh'/>
            <div className='name-item-container'>
              <div className='name-item'>{product.pName}</div>
              <div className='company-item'>{product.pCompany}</div>
            </div>
            <div className='price-item'>{product.pPrice.toLocaleString()}<sup> &#8363;</sup></div>
          </li>
      )
    }):[]}
  </ul>
  );
};

export default ProductList;