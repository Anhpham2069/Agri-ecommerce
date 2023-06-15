
import React, { useEffect,useState,useRef } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{ faMagnifyingGlass } 
from '@fortawesome/free-solid-svg-icons'
import "./style.css";
import ProductList from "./searchList";
// import ProductList from "./searchList";



const Search = () => {

  // const [products, setProducts] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
    // const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [active,isActive ] = useState(false)
    const searchInputRef = useRef(null);

    // const { data, dispatch } = useContext(HomeContext);
    // const { products } = data;


    const [products, setProducts] = useState([])

    const fetchData = () => {
      fetch("http://localhost:8000/api/product/search")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setProducts(data)
        })
    }
    // console.log(products)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Sử dụng cơ chế "click outside" để ẩn kết quả tìm kiếm
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
    document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
              <input className="search" placeholder="bạn cần tìm gì ?"
                type="text"
                // value={searchValue}
                onChange={(e) => setSearchValue(e.target.value) & isActive(true)}
                onFocus={() => setShowResults(true)}
                ref={searchInputRef}
              >
              </input>
              <span className="search-icon"
                // onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
              </span>
              {active ? 
              <ProductList products={products} searchValue={searchValue} show={showResults} active/>
              :[]}
            </div>
  )

                  }
export default React.memo(Search)





