// const multer = require('multer');

// Khởi tạo multer để xử lý tải lên ảnh
// const upload = multer({ dest: 'uploads/'});
const postModel = require('../models/post');


class Post{
  async getAllPosts(req, res){
    try {
      const posts = await postModel.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Thêm bài viết mới
  async createPost(req, res) {
    try {
      // Lấy thông tin từ body request
      const { title, content,author,category } = req.body;
  
      // Kiểm tra xem có tệp ảnh được gửi lên không
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }
  
      // Lấy đường dẫn tới tệp ảnh đã tải lên
      // const imagePath = req.file.path;
      const imageName = req.file.originalname;
      // const createdAt = new Date();
      // Tạo bài viết mới với thông tin và đường dẫn ảnh
      const newPost = await postModel.create({ title, content,author,category, image: imageName, });
  
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Sửa đổi bài viết
  async updatePost(req, res){
    try {
      const postId = req.params.id;
      const { title, content,author,category } = req.body;
  
      // Xử lý tải lên hình ảnh
  
  
      // Lấy đường dẫn tới tệp ảnh đã tải lên
      // const imagePath = req.file.path;
      const imageName = req.file.originalname;
  
        // Cập nhật bài viết với các trường title, content, và image (nếu có)
        const updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { title, content,author,category, image: imageName },
          { new: true }
        );
  
        res.json(updatedPost);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Xóa bài viết
  async deletePost(req, res){
    try {
      const postId = req.params.id;
      await postModel.findByIdAndRemove(postId);
      res.json({ message: 'Bài viết đã được xóa thành công.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async getSinglePost(req, res) {
    try {
      const postId = req.params.id;
      const post = await postModel.findById(postId);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}



const potsController = new Post();
module.exports = potsController;

// const PostModel = require('../models/post');

// class Post{

//   async getAllPosts(req, res){
//     try {
//       const posts = await PostModel.find();
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Thêm bài viết mới
//   async createPost(req, res){
//     try {
//       const { title, content, image } = req.body;
//       const newPost = await PostModel.create({ title, content, image });
//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Sửa đổi bài viết
//   async updatePost(req, res){
//     try {
//       const postId = req.params.id;
//       const { title, content, image } = req.body;
//       const updatedPost = await PostModel.findByIdAndUpdate(
//         postId,
//         { title, content, image },
//         { new: true }
//       );
//       res.json(updatedPost);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Xóa bài viết
//   async deletePost(req, res){
//     try {
//       const postId = req.params.id;
//       await PostModel.findByIdAndRemove(postId);
//       res.json({ message: 'Bài viết đã được xóa thành công.' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
// }


// const potsController = new Post();
// module.exports = potsController;