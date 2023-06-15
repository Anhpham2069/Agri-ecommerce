const express = require('express');
const router = express.Router();
const postController = require('../controller/post');


// Xem tất cả bài viết
router.get('/all-posts', postController.getAllPosts);
// Tạo bài viết mới
router.post('/', postController.createPost);
// Sửa đổi bài viết
router.put('/posts/:id', postController.updatePost);
// Xóa bài viết
router.delete('/posts/:id', postController.deletePost);

module.exports = router;