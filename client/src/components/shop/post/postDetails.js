import React,{useEffect,useState,useContext} from 'react'
import { useParams } from "react-router-dom";
import { getSinglePost } from './fecthApi';
import { Skeleton } from 'antd';
import Productoutstanding from './productoutstanding';

const apiURL = process.env.REACT_APP_API_URL;


const PostDetails = () => {
    const { id } = useParams()
    const [post,setPost]= useState({})
    const [loading,setLoading]= useState(true)
    const articles = [
        {
          title: 'Tác dụng của quả vải',
          image: '../../../images/productsData/vai.jpg',
          content: 'Quả vải có nhiều tác dụng tốt cho sức khỏe. Đầu tiên, quả vải chứa nhiều chất chống oxy hóa, giúp làm chậm quá trình lão hóa và giảm nguy cơ mắc các bệnh lý liên quan đến lão hóa. Thứ hai, vải là một nguồn giàu chất xơ, giúp cải thiện hệ tiêu hóa và giảm nguy cơ táo bón. Ngoài ra, quả vải còn chứa nhiều vitamin và khoáng chất, như vitamin C, kali và magie, có tác dụng tăng cường hệ miễn dịch và hỗ trợ sức khỏe tim mạch. Nếu bạn muốn có một chế độ ăn lành mạnh, hãy bao gồm quả vải vào khẩu phần hàng ngày.',
        },
        // Thêm các bài viết khác vào đây
      ];
 
    const fetchData = async () =>{
        setLoading(false)
        const res = await getSinglePost(id)
        console.log(res)
        if(res){
            setPost(res)
        }else{
            console.log("loi roi")
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    console.log(post)
    if(loading){
        return(
            <Skeleton />
        )
    }
    
  return (

        <div className='article-wraper'>
                <div className='advertisement-container'>

                </div>
                <div className='article-conatiner'>
                    <div className="article">
                        {/* <img src={image} alt={title} className="article__image" /> */}
                        <h2 className="article__title">{post.title}</h2>
                        <p className="article__content">{post.content}</p>
                    </div>
                </div>
                <div className='Featured-container'>
                    <span className='title-article-Featured'>SẢN PHẨM NỔI BẬT</span>
                        <Productoutstanding />
                </div>
        </div>
 
  )
}

export default PostDetails