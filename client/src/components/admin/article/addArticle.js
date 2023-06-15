import React, { useState,useContext } from 'react';
import axios from 'axios';
import { ArticleContext } from './index';
import "./style.css"


const apiURL = process.env.REACT_APP_API_URL;
function AddArticleForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      await axios.post(`${apiURL}/api/posts`, formData);
      alert('Thêm bài viết thành công');
    } catch (error) {
      console.error('Lỗi khi thêm bài viết:', error);
      alert('Đã xảy ra lỗi khi thêm bài viết');
    }

    // Reset form fields
    setTitle('');
    setContent('');
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