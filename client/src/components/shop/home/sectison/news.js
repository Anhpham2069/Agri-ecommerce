import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { getAllPost } from './fetchApi'
import { NavLink } from 'react-router-dom'
import "./style.css"


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
            <p>
            <NavLink   to="/all-post">
                Tin tức và kiến thức

            </NavLink>
                </p>
            <div className='list-menu'>
                    <li>
                <NavLink to="/all-post">
                        Chuyện nhà Nông
                </NavLink>
                </li>
                <li>
                <NavLink to="/all-post">
                    Bí kíp nấu ăn

                </NavLink>
                    </li>
                <li>
                    <NavLink to="/all-post">
                    Không gian xanh
                    </NavLink >
                </li>
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