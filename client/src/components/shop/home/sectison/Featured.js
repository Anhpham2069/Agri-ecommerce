import React,{useContext} from 'react'
import { HomeContext } from "../index";
import CartFeatured from "./components/CartFeatured"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/scrollbar/scrollbar.min.css'



const FeaturedProduct = () => {
  
  const { data } = useContext(HomeContext);
  const { products } = data;
  
  
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