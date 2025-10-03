import express from 'express'
import { addBlog, deleteBlog, getAllBlog, getBlogById, getDescription, getImages, updateBlog } from '../Controller/BlogController.js';
import { upload } from '../MiddleWares/Multer.js';

const router = express.Router()

router.post('/add-blog', upload.single('image'), addBlog)
router.get('/get-blogs', getAllBlog)
router.get('/get-description/:slug', getDescription)
router.delete('/delete-blog/:id', deleteBlog)
router.get('/get-blogs/:id', getBlogById)
router.put('/update-blog/:id', updateBlog)
router.get('/get-images', getImages)


export default router