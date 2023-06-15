import React,{useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 
{faAngleRight} 
from '@fortawesome/free-solid-svg-icons'
import "./style.css"
import Map from "../../../../images/product-page/bando.jpg"
import Modal from "./specialyModal"
import { HomeContext } from "../index";
import { useHistory } from "react-router-dom";
import CartProducts from './components/cartProducts';
import { Skeleton } from 'antd';

// const apiURL = process.env.REACT_APP_API_URL;

const SpecialtyComponent = () => {

    const history = useHistory();
    const { data,  } = useContext(HomeContext);
    const { products } = data;

    const [area, setArea] = useState([
        { id: 1, name: 'Bắc',content:"Miền Bắc Việt Nam là một vùng đất đa dạng về văn hóa, lịch sử và nông nghiệp. Với cảnh quan thiên nhiên phong phú, miền Bắc là một trong những vùng đất phát triển nông nghiệp quan trọng của đất nước. Đồng thời, miền Bắc cũng nổi tiếng với những đặc sản nông sản độc đáo và chất lượng cao.Một trong những đặc sản nông sản nổi tiếng của miền Bắc là gạo nếp cái hoa vàng. Loại gạo này có hạt nhỏ, trắng ngần và mềm mịn. Gạo nếp cái hoa vàng thường được sử dụng để làm các món ăn truyền thống như xôi nếp, bánh chưng, bánh dày và bánh giầy. Hương vị đặc trưng và mùi thơm đặc biệt của gạo nếp cái hoa vàng đã làm nên sự nổi tiếng của đặc sản này.Miền Bắc cũng được biết đến với một loại cây trái nổi tiếng là mận Lục Ngạn. Mận Lục Ngạn có vị ngọt thanh, thịt mận giòn và hương thơm đặc trưng. Đây là loại mận được trồng ở vùng cao nguyên Lục Ngạn, tỉnh Bắc Giang. Mận Lục Ngạn không chỉ ngon mà còn có nhiều giá trị dinh dưỡng và là nguồn cung cấp vitamin C tự nhiên.Ngoài ra, miền Bắc còn sản xuất nhiều loại trái cây và rau quả chất lượng khác như táo Sapa, nho Vàng Đà Lạt, đu đủ, bí đỏ, cải bắp, cải thảo và nhiều loại rau xanh khác. Các sản phẩm nông sản từ miền Bắc thường được trồng trên đất đai trong sạch và được chăm sóc bằng các phương pháp truyền thống để đảm bảo chất lượng và giữ nguyên hương vị tự nhiên.Với đặc sản nông sản độc đáo và chất lượng cao, miền Bắc Việt Nam không chỉ là điểm đến hấp dẫn về du lịch mà còn là một thế giới ẩm thực phong phú và đa dạng, thu hút sự quan tâm của nhiều người trong và ngoài nước", showModal: false },
        { id: 2, name: 'Trung', showModal: false },
        { id: 3, name: 'Nam', showModal: false },
        // Thêm các div khác vào đây
      ]);
    // show modal-map
    const handleMouseOver = (divId) => {
        const updatedDivs = area.map((div) => {
          if (div.id === divId) {
            return { ...div, showModal: true };
          }
          return div;
        });
        setArea(updatedDivs);
      };
    
      const handleMouseLeave = (divId) => {
        const updatedDivs = area.map((div) => {
          if (div.id === divId) {
            return { ...div, showModal: false };
          }
          return div;
        });
        setArea(updatedDivs);
      };

      if(data.loading){
        return(
          <Skeleton active/>
        )
      }
    return (
    <>
    <div className="market-container">
        <div className='market-title'>
            <p className='title'>Đặc sản vùng miền</p>
            <div className='menu-title'>
                <a href='#shop'>Miền Bắc</a>
                <a href='#shop'>Miền Trung</a>
                <a href='#shop'>Miền Nam</a>
                <a href='#shop'>Tây Nguyên</a>   
            </div>
            <a className='see-all' 
            onClick={(e) => history.push(`/products/category/647795a8a6be5512bc83e9a3`)}
          >
            xem tất cả <FontAwesomeIcon icon={faAngleRight} size='xs' /></a>
        </div>
        <div className='container-product-specialy'>
            <div className='map-container'>
                <div className='img-map'>
                    <img  src={Map} alt='anh' style={{width:"100%"}}/>
                </div>
                <div className='area-map'>
                {area.map((div) => (
                    <div
                    key={div.id}
                    onMouseOver={() => handleMouseOver(div.id)}
                    onMouseLeave={() => handleMouseLeave(div.id)}
                    >
                    <div className="area">
                        <p>{div.name}</p>
                    </div>
                        {div.showModal && <Modal divName={div.name} DivContent={div.content} />}
                    </div>
                ))}
                </div>
            </div>
            <div className='specialy-products-container mb-5'>
            {products && products.length > 0 ? (
                   products
                  .filter(obj => obj.pCategory.cName === 'ĐặC Sản')
                  .map((item,index)=>{
                        return(
                          <CartProducts key={index} data={item}/>
                        )})):[]}
            </div>
        </div>
    </div>

    </> 
  )
}

export default React.memo(SpecialtyComponent)