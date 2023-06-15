import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{ faAngleRight} 
from '@fortawesome/free-solid-svg-icons'
import "./style.css"
import { HomeContext } from "../index";
import { useHistory, } from "react-router-dom";
import CartProducts from './components/cartProducts';
import { Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';


const Market = () => {
  const history = useHistory();
  
  const { data, } = useContext(HomeContext);
  const { products } = data;

  if(data.loading){
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
            <div className='market-products-container mb-5'>
            {products && products.length > 0 ? (
                   products
                  .filter(obj => obj.pCategory.cName === 'Chợ Online')
                  .map((item,index)=>{
                        return(
                            <CartProducts key={index} data={item}/>
                           
                            
                        )    })
                        ):[]}
                
                
                </div>
            </div>
        </div>
   

    </> 
  )
}

export default React.memo(Market)