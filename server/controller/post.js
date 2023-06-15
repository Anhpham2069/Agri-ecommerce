const Post = require('../models/post');



const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm bài viết mới
const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = await Post.create({ title, content, image });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sửa đổi bài viết
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, image } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, image },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa bài viết
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndRemove(postId);
    res.json({ message: 'Bài viết đã được xóa thành công.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost,getAllPosts };

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