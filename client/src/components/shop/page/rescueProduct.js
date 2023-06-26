import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { LayoutContext } from '../layout';
import { cartListProduct, getAllProduct } from '../partials/FetchApi';
import { cartList,addToCart } from '../home/Mixins';
import { totalCost } from '../partials/Mixins';
import { useHistory, useParams } from "react-router-dom";
import { Card, Col, Row,message } from 'antd';
import {ShoppingCartOutlined} from "@ant-design/icons"
import "./style.css"

const apiURL = process.env.REACT_APP_API_URL;
const RescueProduct = () => {
    const history = useHistory()
    const [products,setProducts] = useState()

    const [quantitiy,setQuantitiy] = useState(1)
    const { _, dispatch: layoutDispatch } =
    useContext(LayoutContext); // Layout Context
    const [, setAlertq] = useState(false); // Alert when quantity greater than stock

    const fetchDataProducts = async () => {
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

    useEffect(()=>{
        fetchDataProducts()
    },[])
    console.log(products)

    const fetchData = async () => {

        layoutDispatch({ type: "inCart", payload: cartList() }); // This function change cart in cart state
      
        fetchCartProduct();
        message.success("Thêm vào giỏ hàng thành công") // Updating cart total
      };
    
      const fetchCartProduct = async () => {
        try {
          let responseData = await cartListProduct();
          if (responseData && responseData.Products) {
            layoutDispatch({ type: "cartProduct", payload: responseData.Products }); // Layout context Cartproduct fetch and dispatch
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='rescue-container'>
        <div className='flex py-5'>
            <p className='text-red-800' 
                onClick={(e) => history.push("/")}>
            Shop &#160; /</p>
            <p>&#160; Giải cứu nông sản</p>

        </div>
        <div className='p-5 mb-5 bg-white'>
            <span className='title-rescue px-3'>&#160; Chào mừng đến với Trang Giải cứu Nông sản cùng Bà con! 
              Chúng ta là một cộng đồng nhằm giúp đỡ nhau trong việc giải cứu nông sản. Hãy chung tay ủng hộ các sản
              phẩm nông nghiệp của bà con nông dân Việt Nam nhé
              !</span>
        </div>
        <Row gutter={[40, 32]} justify="center">

        {products && products
        .filter(o=>o.pHashtag ==="Giải cứu")
        .map((item)=>{
            return(
                <Col span={6}>
                    <Card>
                        <div className='item-container'
                         
                        >
                            <div onClick={(e) => history.push(`/products/${item._id}`)}>
                                <img className='rescue-img' src={`${apiURL}/uploads/products/${item.pImages[0]}`}/>
                                <p>{item.pName}</p>
                                <p>{item.pQuantity}</p>
                                <span className="market-product-price">
                                    {(item.pPrice-(item.pPrice*(item.pOffer/50))).toLocaleString()}<sup> &#8363;</sup> &nbsp;
                                    <del>{ Math.ceil(item.pPrice).toLocaleString()}<sup> &#8363;</sup> </del>
                                </span>
                                <p className='text-bold text-red-500'>#{item.pHashtag}</p>
                            </div>
                            <span className='btn-addCart'
                                onClick={(e) =>
                                    addToCart(
                                        item._id,
                                        quantitiy,
                                        item.pPrice,
                                        layoutDispatch,
                                        setQuantitiy,
                                        setAlertq,
                                        fetchData,
                                        totalCost
                                    )
                                }
                            >
                                <ShoppingCartOutlined />
                            </span>
                        </div>
                        
                    </Card>
                </Col>
            )
        })}

        </Row>
    </div>
  )
}

export default RescueProduct