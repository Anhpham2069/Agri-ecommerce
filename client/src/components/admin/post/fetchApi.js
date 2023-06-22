import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

export const createPost = async (title, content,author, imageFile)=> {
  try {
    // Tạo FormData để định dạng dữ liệu gửi đi
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('image', imageFile);

    // Gửi yêu cầu POST đến server
    const response = await axios.post(`${apiURL}/api/post/create-post`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Cần đặt header 'Content-Type' là 'multipart/form-data' khi gửi dữ liệu có file
      }
    });

    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
}

export const getAllPost = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/post/all-post`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (postId, data) => {
  try {
    const response = await axios.put(`/api/post/update-post/${postId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}


// Sử dụng hàm createPost
// const title = 'Tiêu đề bài viết';
// const content = 'Nội dung bài viết';
// const imageFile = // Đối tượng tệp ảnh (File object) đã được chọn từ input type="file"
// createPost(title, content, imageFile)
//   .then((newPost) => {
//     console.log(newPost);
//     // Xử lý kết quả trả về
//   })
//   .catch((error) => {
//     console.error(error);
//     // Xử lý lỗi
//   });