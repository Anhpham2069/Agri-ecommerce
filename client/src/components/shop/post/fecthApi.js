import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;


export const getAllProduct = async () => {
    try {
      let res = await axios.get(`${apiURL}/api/product/all-product`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
export const getAllPost = async () => {
    try {
      let res = await axios.get(`${apiURL}/api/post/all-post`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
};

export const getSinglePost = async (postId) =>{
    try{
        let res = await axios.get(`${apiURL}/api/post/${postId}`)
        return res.data
    }catch(error){
        console.log(error);
    }
}