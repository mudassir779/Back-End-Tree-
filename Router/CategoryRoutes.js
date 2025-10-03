import express from 'express'
import { addCategory, getCategory, deleteCategory, updateCategory, categoryBySlug } from '../Controller/CategoryController.js';

const router = express.Router()

router.post('/add-category', addCategory)
router.get('/get-category', getCategory)
router.get('/get-category/:slug', categoryBySlug)
router.delete('/delete-category/:id', deleteCategory)
router.put('/update-category/:id', updateCategory)

export default router