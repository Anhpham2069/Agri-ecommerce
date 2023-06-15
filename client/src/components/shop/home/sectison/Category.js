import React,{} from 'react'
// import CartCategory from './components/cartCategory'
 import marketbg from "../../../../images/productsData/vegetables_in_whole_foods_market_513270.jpg"
 import fruitbg from '../../../../images/productsData/mang cut ben tre.jpg';
 import specialbg from '../../../../images/productsData/dacsan/vaithieuluc ngan 1kg1.jpg';

 
import { useHistory } from "react-router-dom";

const Category = () => {
    const history = useHistory();


  return (
    <div className='category-container'>
        
        <div className='category-market'
                onClick={(e) => history.push(`/products/category/6458b1c301a5b61c4cc656bd`)}
        >
            <img src={marketbg} alt='ĐI CHỢ ONLINE'/>
            <p className='category-title'>ĐI CHỢ ONLINE</p>
        </div>      
        <div className='category-1'>
            <div className='category-fruit'
                onClick={(e) => history.push(`/products/category/6458b19701a5b61c4cc656b3`)}
            >
            <img src={fruitbg} alt='HOA QUẢ TƯƠI'/>
                <p className='category-title'>HOA QUẢ TƯƠI</p>
            </div>
            <div className='category-special'
                onClick={(e) => history.push(`/products/category/647795a8a6be5512bc83e9a3`)}
            >
            <img src={specialbg} alt='ĐẶC SẢN'/>
                <p className='category-title'>ĐẶC SẢN</p>
            </div>
        </div>  
    </div>
  )
}

export default Category