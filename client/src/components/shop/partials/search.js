
import React, { useEffect,useState,useContext } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{ faMagnifyingGlass } 
from '@fortawesome/free-solid-svg-icons'
import { getAllProduct } from "./FetchApi";
import { HomeContext } from "../home/index";
import "./style.css";
import ProductList from "../home/searchList";
import { useHistory } from "react-router-dom";


const Search = ({products}) => {
  const history = useHistory();

  // const [products, setProducts] = useState(false);
  const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // const { data, dispatch } = useContext(HomeContext);
    // const { products } = data;

    // useEffect(() => {   
    //     fetchDataProduct()
    //     }, []);
    
    // const fetchDataProduct = async () => {
    //     try {
    //         let responseData = await getAllProduct();
    //         setProducts(responseData)
    //         console.log(responseData)
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     };
        console.log(products)
    

  return (
    <div className="search-container">
              <input className="search" placeholder="bạn cần tìm gì ?"
                type="text"
                // value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              >
              </input>
              <span className="search-icon"
                // onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <ul className="search-list-item">
                {products && products.filter((product)=>product.pName.toLowerCase().includes(searchValue))
                .map((product) => {
                  return(
                      <li key={product._id} className="search-item"
                                onClick={(e) => history.push(`/products/${product._id}`)}
                      >
                        <img src={product.pImages[0]} />
                        <div>{product.pName}</div>
                        <div>{product.pQuantity}</div>
                      </li>
                  )
                })}
              </ul>
            </div>
  )

                  }
export default React.memo(Search)





