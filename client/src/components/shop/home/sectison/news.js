import React from 'react'
import "./style.css"

import ANH from "../../../../images/productsData/news/Nguon-qua-cam-sanh-chat-luong-tai-Foodmap-1200x675.jpg"
import ANH2 from "../../../../images/productsData/news/xhoi.jpg"
import ANH3 from "../../../../images/productsData/news/ESG-definition-and-meaning.jpeg"
import ANH4 from "../../../../images/productsData/news/chatluong.jpg"
import ANH5 from "../../../../images/productsData/news/thachthuc.jpg"




const News = () => {
  return (
    <>
    <div className="news-container">
        <div className='news-title'>
            <p>Tin tức và kiến thức</p>
            <div className='list-menu'>
                <li>Chuyện nhà Nông</li>
                <li>Bí kíp nấu ăn</li>
                <li>Không gian xanh</li>
            </div>
        </div>
        <div className='list-post-container'>
            <div className='post-detail-main'>
                <div>
                <img src={ANH} alt='anh'/>
                    <b className='post-title'>Nông sản và vai trò quan trọng trong đời sống và phát triển kinh tế</b>
                    <p className='post-content'> Nông sản đóng vai trò cực kỳ quan trọng trong đời sống và phát triển kinh tế của một quốc gia</p>
                </div>
                <div>
                    <img src={ANH4} alt='anh'/>
                    <b className='post-title'>Cải thiện chất lượng nông sản: Giải pháp để tăng cường xuất khẩu</b>
                    <p className='post-content'>Cải thiện chất lượng nông sản là một yếu tố quan trọng để tăng cường khả năng cạnh tranh và mở ra cơ hội xuất khẩu rộng lớn cho nông sản Việt Nam.</p>
                </div>
            </div>

            <div className='list-post'>
                <div className='post-detail'>
                    <img className=''src={ANH2} alt='anh'/>
                    <b className='post-title'>"Các xu hướng mới trong sản xuất và tiêu thụ nông sản"</b>
                </div>
                <div className='post-detail'>
                    <img className=''src={ANH3} alt='anh'/>
                    <b className='post-title'>"Cách bảo quản và chế biến nông sản để tăng giá trị gia tăng"</b>
                </div>
                <div className='post-detail'>
                    <img className=''src={ANH5} alt='anh'/>
                    <b className='post-title'>"Những thách thức và cơ hội trong sản xuất và tiêu thụ nông sản hiện nay"</b>
                </div>
            </div>
        </div>
      
    </div>
    </> 
  )
}

export default News