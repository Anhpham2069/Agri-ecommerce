import React,{useEffect,useState} from 'react';
import CartProducts from '../home/sectison/components/cartProducts';
import { Footer, Navber } from "../partials";

import "./style.css"

const apiURL = process.env.REACT_APP_API_URL;
const ArticleList = () => {

  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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


const handlePriceRangeClick = (min, max) => {
  setSelectedPriceRange({ min, max });
};
const handleCategoryClick = (category) => {
  setSelectedCategory(category);
};
const handleShowAllProducts = () => {
  setShowAllProducts(true);
};
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

// Lọc danh sách sản phẩm dựa trên khoảng giá đã chọn
// const filteredProducts = products.filter((product) => {
//   if (showAllProducts) {
//     return true; // Hiển thị tất cả sản phẩm ban đầu
//   }
//   if (selectedPriceRange) {
//     const { min, max } = selectedPriceRange;
//     const categoryCondition =
//     !selectedCategory || product.pCategory === selectedCategory;
//     const priceCondition = product.pPrice >= min && product.pPrice <= max
//     console.log(categoryCondition)
//     return priceCondition || categoryCondition;
//   } else {
//     return true;
//   }
// });
const filteredProducts = products.filter((product) => {
  if (showAllProducts) {
    return true; // Hiển thị tất cả sản phẩm ban đầu
  }
  const { min, max } = selectedPriceRange || {};
  // const categoryCondition = !selectedCategory || product.pCategory === selectedCategory;
  const priceCondition = !min || (product.pPrice >= min && product.pPrice <= max);
  
  return priceCondition 
  // && categoryCondition;
});

// Tính toán vị trí bắt đầu và vị trí kết thúc của danh sách sản phẩm
const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;
const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

// Tính toán tổng số trang
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

const categories = ["Chợ online", "Hoa Quả Nhập Khẩu 1", "ĐặC Sản"];
  return (
    <>
            <Navber/>
        <div className='article-wraper'>
          <div className='filter-container'>
          <div className='filter-item' onClick={handleShowAllProducts}>Tất cả</div>
            <div className='filter-title'>Lọc theo giá</div>
            <div className='filter-item' 
            onClick={() => handlePriceRangeClick(1000, 20000)}
            >0-20.000 đ</div>
            <div className='filter-item'
            onClick={() => handlePriceRangeClick(20000, 50000)}
            >20.000-50.000 đ</div>
            <div className='filter-item'
            onClick={() => handlePriceRangeClick(50000, 100000)}
            >50.000 - 100.000 đ</div>
            <div className='filter-item'
            onClick={() => handlePriceRangeClick(100000, 1000000)}
            > &#62; 100.0000 đ</div>

            <div className='filter-title'
          
            >Lọc theo loại</div>
            {/* <div className='filter-item'
              onClick={() => handleCategoryClick("Chợ Online")}
            >Chợ online</div> */}
            {categories.map((category) => (
               <div className='filter-item' key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </div>
            ))}
            {/* <div className='filter-item'>Hoa quả</div>
            <div className='filter-item'>đặc sản</div> */}
          </div>
                <div className='all-product-conatiner'>
                    {currentProducts && currentProducts.map((item, index) => (
                        <CartProducts
                          key={item._id}
                          data={item}
        
                        />
                    ))}
                        {totalPages > 1 && (
                            <div className='page-number'>
                              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (pageNumber) => (
                                  <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                  >
                                    {pageNumber}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                </div>
                <div className='Featured-container Featured-container'>
                <span className='title-article-Featured'>SẢN PHẨM NỔI BẬT</span>
                    {products && products
                     .filter(obj => obj.pOffer > 10)
                    .map((item)=>{
                        return(
                            <div key={item._id} className='featured-item-article'>
                                
                                <img 
                                src={`${apiURL}/uploads/products/${item.pImages[0]}`} alt='anh'/>
                                <div>
                                    <span className='name'>{item.pName}</span>
                                    <span className='price'>{item.pPrice}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
        <Footer/>
    </>
  );
};

export default ArticleList;