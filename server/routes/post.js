const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controller/post');
const upload = multer({ dest: 'uploads/' }); 


// Xem tất cả bài viết
router.get('/all-post', postController.getAllPosts);
// Tạo bài viết mới
router.post('/create-post', upload.single('image'),postController.createPost);
// Sửa đổi bài viết
router.put('/update-post/:id', postController.updatePost);
// Xóa bài viết
router.delete('/delete-post/:id', postController.deletePost);

module.exports = router;