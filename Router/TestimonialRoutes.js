import express from 'express'
import { addTestimonials, getEstimates, getTestimonials, submitEstimate, deleteTestimonial } from '../Controller/TestimonialController.js';
import { upload } from '../MiddleWares/Multer.js';

const router = express.Router()

router.post('/create-testimonials', upload.none(), addTestimonials)
router.get('/get-testimonials', getTestimonials)
router.post('/submit-estimate', submitEstimate)
router.get('/get-estimates', getEstimates);
router.delete('/delete-testimonial/:id', deleteTestimonial);

export default router