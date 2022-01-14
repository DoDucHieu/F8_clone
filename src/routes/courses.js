const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create); //render ra view để thêm khóa học mới
router.post('/store', courseController.store); //lưu khóa học vừa thêm
router.get('/:id/edit', courseController.edit);// Render ra view để cập nhật khóa học
router.put('/:id', courseController.update); // cập nhật khóa học
router.delete('/delete/:id', courseController.delete); //xóa khóa học đùa
router.delete('/deletePermanently/:id', courseController.deletePermanently); //xóa khóa học vĩnh viễn
router.patch('/:id/restore', courseController.restore); //khôi phục khóa học
router.post('/handleFormAction', courseController.handleFormAction); //xóa tất cả
router.get('/:slug', courseController.show); //render ra view cụ thể khóa học khi ấn vào mỗi khóa học trong home


module.exports = router;

