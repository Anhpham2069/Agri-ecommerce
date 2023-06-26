import React,{useEffect,useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 
{faAngleRight,} 
from '@fortawesome/free-solid-svg-icons'
import "./style.css"
// import { fruits } from './data';
import { getAllProduct } from "../../../admin/products/FetchApi";
import { HomeContext } from "../index";
import { useHistory,  } from "react-router-dom";
import CartProducts from './components/cartProducts';
import CartProducts2 from './components/cartProduct2';
import { Skeleton,Row,Col } from 'antd';



const Fruit = () => {
    const history = useHistory();

    // const { data, dispatch } = useContext(HomeContext);
    // const { products } = data;
    const [products,setProducts] = useState()


console.log(products)

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    // dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setProducts(responseData.Products)
      // setTimeout(() => {
      //   if (responseData && responseData.Products) {
      //     dispatch({ type: "setProducts", payload: responseData.Products });
      //     dispatch({ type: "loading", payload: false });
      //   }
      // }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  // if(products.loading){
  //   return(
  //     <Skeleton active/>
  //   )
  // }

  return (
    <>
 
    <div className="market-container">
        <div className='market-title'>
            <p className='title'>Hoa quả tươi ngon</p>
            <div className='menu-title'>
                <a href='#shop'>Nội địa</a>
                <a href='#shop'>Nhập khẩu</a>
                <a href='#shop'>Xấy khô</a>
                <a href='#shop'>Đông lạnh</a>
            </div>
            <a className='see-all' 
            onClick={(e) => history.push(`/products/category/6458b19701a5b61c4cc656b3`)}
          >
            xem tất cả <FontAwesomeIcon icon={faAngleRight} size='xs' /></a>
        </div>
        <div className='wraper-product'>
        <div className='container-product-fruit mb-5'>
           <Row gutter={[40, 32]} className='px-5'>

                {products && products.length > 0 ? (
                   products
                  .filter(obj => obj.pCategory.cName === 'Hoa Quả Nhập Khẩu 1')
                  .slice(0, 8) 
                  .map((item)=>{
                        return(
                        <Col span={6}>
                          <CartProducts2 key={item._id} data={item}/>
                        </Col>
                          // <CartProducts key={item._id} data={item}/>
                        )
                    })
                )
                :[     
                ]}
           </Row>
                {/* <span className='next-product'>
                    <FontAwesomeIcon icon={faCircleChevronRight} size='xl'/>
                </span> */}
           
        </div>
        </div>
    </div>

    </> 
  )
}

export default React.memo(Fruit)