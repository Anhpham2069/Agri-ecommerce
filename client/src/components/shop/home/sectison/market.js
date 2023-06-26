import React,{useContext,useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{ faAngleRight} 
from '@fortawesome/free-solid-svg-icons'
import "./style.css"
import { HomeContext } from "../index";
import { getAllProduct } from "../../../admin/products/FetchApi";
import { useHistory, } from "react-router-dom";
import CartProducts from './components/cartProducts';
import CartProducts2 from './components/cartProduct2';
import { Skeleton,Row,Col } from 'antd';
import { NavLink } from 'react-router-dom';


const Market = () => {
  const history = useHistory();
  
  // const { data, } = useContext(HomeContext);
  // const { products } = data;
  const [products,setProducts] = useState()
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchData = async () => {
    try {
      let responseData = await getAllProduct();
      setProducts(responseData.Products)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  if(loading){
    return(
      <Skeleton active/>
    )
  }
  return (
    <>
    <NavLink to="/allProducts">
       <div className='see-all-product'>xem tất cả sản phẩm</div>

    </NavLink>
    <div className="market-container">
        <div className='market-title'>
            <p className='title'>Đi chợ online</p>
            <div className='menu-title'>
                <a href='#shop'>Rau củ quả</a>
                <a href='#shop'>Thịt-hải sản</a>
                <a href='#shop'>Thực phẩm chế biến sẵn</a>
                <a href='#shop'>gạo</a>
            </div>
            <a className='see-all' 
            onClick={(e) => history.push("/products/category/6458b1c301a5b61c4cc656bd")}
          >
            xem tất cả <FontAwesomeIcon icon={faAngleRight} size='xs' /></a>
        </div>
        <div className='container-product'>
            <div className='market-products-container'>
              <Row gutter={[40, 32]} className='px-5'>

            {products && products.length > 0 ? (
                   products
                  .filter(obj => obj.pCategory.cName === 'Chợ Online')
                  .slice(0, 8) 
                  .map((item,index)=>{
                        return(
                          <Col span={6}>
                            <CartProducts2 key={item._id} data={item}/>
                         </Col>
                            // <CartProducts key={index} data={item}/>
                        )    })
                        ):[]}
                
              </Row>
                
                </div>
            </div>
        </div>
   

    </> 
  )
}

export default React.memo(Market)