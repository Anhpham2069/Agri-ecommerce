import React,{useEffect,useState} from 'react';
import Article from './postPage';
import { Footer, Navber } from "../partials";

const apiURL = process.env.REACT_APP_API_URL;
const ArticleList = () => {
  const articles = [
    {
      title: 'Tác dụng của quả vải',
      image: '../../../images/productsData/vai.jpg',
      content: 'Quả vải có nhiều tác dụng tốt cho sức khỏe. Đầu tiên, quả vải chứa nhiều chất chống oxy hóa, giúp làm chậm quá trình lão hóa và giảm nguy cơ mắc các bệnh lý liên quan đến lão hóa. Thứ hai, vải là một nguồn giàu chất xơ, giúp cải thiện hệ tiêu hóa và giảm nguy cơ táo bón. Ngoài ra, quả vải còn chứa nhiều vitamin và khoáng chất, như vitamin C, kali và magie, có tác dụng tăng cường hệ miễn dịch và hỗ trợ sức khỏe tim mạch. Nếu bạn muốn có một chế độ ăn lành mạnh, hãy bao gồm quả vải vào khẩu phần hàng ngày.',
    },
    // Thêm các bài viết khác vào đây
  ];

  const [products, setProducts] = useState([])

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

  return (
    <>
            <Navber/>
        <div className='article-wraper'>
                <div className='article-conatiner'>
                    {articles.map((article, index) => (
                        <Article
                        key={index}
                        title={article.title}
                        image={article.image}
                        content={article.content}
                        />
                    ))}
                </div>
                <div className='Featured-container'>
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