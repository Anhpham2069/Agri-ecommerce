import React, { useState,useContext } from 'react';
import axios from 'axios';
import { ArticleContext } from './index';
import {updatePost} from "./fetchApi"
import { message } from 'antd';
import "./style.css"
// import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Checkbox,
//   Col,
//   Form,
//   InputNumber,
//   Radio,
//   Rate,
//   Row,
//   Select,
//   Slider,
//   Space,
//   Switch,
//   Upload,
// } from 'antd';


const apiURL = process.env.REACT_APP_API_URL;



function UpdatePostModal({ postId,postTitle,postContent,postAuthor,postImg,postCategory }) {
  const [title, setTitle] = useState(postTitle);
  const [content, setContent] = useState(postContent);
  const [author, setAuthor] = useState(postAuthor);
  const [category, setCategory] = useState(postCategory);
  const [image, setImage] = useState(postImg);

console.log(image)
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };
    // console.log(posts)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('image', image);
    try {
        let response = await updatePost(postId,formData)
        if(response){
          message.success("Sửa bài viết thành công")
        }
    } catch (error) {
      console.error('Lỗi khi sửa bài viết:', error);
      message.error('Đã xảy ra lỗi khi sửa bài viết');
    }

    // Reset form fields
    setTitle('');
    setContent('');
    setAuthor('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-article-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Tiêu đề
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Nội dung
        </label>
        <textarea
          className="form-control"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Tác giả
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Chuyên mục
        </label>
        <select
          type="text"
          className="form-control"
          id="title"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
            <option>Chọn chuyên mục</option>
            <option>Chuyện nhà Nông</option>
            <option>Bí kíp nấu ăn</option>
            <option>Không gian xanh</option>
          </select>
      </div>
      <label htmlFor="image">Hình ảnh:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br /><br />
          {image && (
            <div>
              <img src={URL.createObjectURL(image)} alt="Selected Image" />
            </div>
          )}
            <br /><br />
      
      <button type="submit" className="btn btn-primary">
        Sửa bài viết
      </button>
    </form>
  );
}

export default UpdatePostModal;

{/* <Form.Item
name="upload"
label="Upload"
valuePropName="fileList"
// getValueFromEvent={normFile}
extra="long"
>
<Upload name="logo" action="/upload.do" listType="picture">
  <Button icon={<UploadOutlined />}>Click to upload</Button>
</Upload>
</Form.Item> */}