const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controller/post');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/post'); // Thay đổi 'uploads/' thành đường dẫn đến thư mục lưu trữ của bạn
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  // Khởi tạo Multer với storage đã cấu hình
  const upload = multer({ storage: storage });


// Xem tất cả bài viết
router.get('/all-post', postController.getAllPosts);
router.get('/:id', postController.getSinglePost);
// Tạo bài viết mới
router.post('/create-post', upload.single('image'),postController.createPost);
// Sửa đổi bài viết
router.post('/update-post/:id', upload.single('image'), postController.updatePost);
// router.put('/update-post/:id', postController.updatePost);
// Xóa bài viết
router.delete('/delete-post/:id', postController.deletePost);

module.exports = router;