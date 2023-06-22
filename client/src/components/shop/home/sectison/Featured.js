import React,{useContext,useState,useEffect} from 'react'
import { HomeContext } from "../index";
import { getAllProduct } from '../../../admin/products/FetchApi';
import CartFeatured from "./components/CartFeatured"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/scrollbar/scrollbar.min.css'



const FeaturedProduct = () => {
  
  // const { data } = useContext(HomeContext);
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
  
  
  return (
    <div className='featured-container'>
        <div className='featured-title'>
          <p>Khuyến mại nổi bật</p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >

        <div className='featured-list-item'>
          {products && products
                    .filter(obj => obj.pOffer > 10 )
                    .map((item,index)=>(
                            <SwiperSlide key={item._id}>
                              <CartFeatured  index={index} item={item}/>
                            </SwiperSlide>
                    ))
                 }
                
        </div>
    </Swiper>

    </div>
  )
}

export default FeaturedProduct