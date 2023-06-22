import React, { useState,useContext } from 'react';
import axios from 'axios';
import { ArticleContext } from './index';
import {createPost} from "./fetchApi"
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
function AddArticleForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let response = await createPost(title,content,author,image)
        if(response){
          message.success("them bai viet thanh cong")
        }
    } catch (error) {
      console.error('Lỗi khi thêm bài viết:', error);
      alert('Đã xảy ra lỗi khi thêm bài viết');
    }

    // Reset form fields
    setTitle('');
    setContent('');
    setAuthor('');
    setImage(null);
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
      <label htmlFor="image">Hình ảnh:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br /><br />
      
      <button type="submit" className="btn btn-primary">
        Thêm bài viết
      </button>
    </form>
  );
}

export default AddArticleForm;

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