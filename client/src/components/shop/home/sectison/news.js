import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { getAllPost } from './fetchApi'
import "./style.css"

import ANH from "../../../../images/productsData/news/Nguon-qua-cam-sanh-chat-luong-tai-Foodmap-1200x675.jpg"
import ANH2 from "../../../../images/productsData/news/xhoi.jpg"
import ANH3 from "../../../../images/productsData/news/ESG-definition-and-meaning.jpeg"
import ANH4 from "../../../../images/productsData/news/chatluong.jpg"
import ANH5 from "../../../../images/productsData/news/thachthuc.jpg"


const apiURL = process.env.REACT_APP_API_URL;

const News = () => {
    const history = useHistory()

    const [posts,setPosts] = useState()

    console.log(posts)
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () =>{
        const res = await getAllPost()
        if(res){
            setPosts(res)
        }
        else{
            console.log("loi")
        }
    }
  
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
            {posts?.map((item,index)=>{
                return(
                    <div className='list-post' key={item._id}
                    onClick={(e) => history.push(`/post/${item._id}`)}
                    >
                        <img  src={`${apiURL}/uploads/post/${item.image}`}/>
                        <div className='post-title'>{item.title}</div>
                        <div className='post-content'>{item.content.slice(0,80)}...</div>
                    </div>
                )
            })}
        </div>
      
    </div>
    </> 
  )
}

export default News