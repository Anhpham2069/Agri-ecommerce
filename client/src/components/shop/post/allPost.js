
import React, { Fragment,useEffect,useState } from 'react';
import Layout from '../layout';
import { getAllPost } from './fecthApi';
import { useHistory } from 'react-router-dom';
import Productoutstanding from './productoutstanding';
import "./style.css"


const apiURL = process.env.REACT_APP_API_URL;
export const AllPost = () => {
    const history = useHistory()
    const [posts,setPosts] = useState()

    useEffect(()=>{
        let fetchData = async ()=>{
            let response = await getAllPost()
            if(response){
                setPosts(response)
            }
        }
        fetchData()
    },[])
console.log(posts)



  return (
    <div className='post-container'>
        
        <div className='post-item-container'> 
            <span className='p-8 mt-8'>tất cả bài viết</span>
        {posts?.map((item)=>(
            <div className='post-item'
            onClick={(e) => history.push(`/post/${item._id}`)}
            >
                <img src={`${apiURL}/uploads/post/${item.image}`} alt='anh' />
                <div className='all-post-title'>{item.title}</div>
                <div className='all-post-content'>{item.content.slice(0,150)}...</div>
            </div>
        ))}
        </div>
         <div className='Featured-container'>
                    <span className='title-article-Featured'>SẢN PHẨM NỔI BẬT</span>
                        <Productoutstanding />
        </div>
    </div>
  )
}


const AllPostPage = () => {
  return (
    <Fragment>
       <Layout children={<AllPost />} />
    </Fragment>
  );
};



export default AllPostPage