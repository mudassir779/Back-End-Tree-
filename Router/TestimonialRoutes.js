import express from 'express';
import { 
  addTestimonials, 
  getEstimates, 
  getTestimonials, 
  submitEstimate, 
  deleteTestimonial 
} from '../Controller/TestimonialController.js';
import { upload } from '../MiddleWares/Multer.js';

const router = express.Router();

// Create/Add new testimonial (review submit)
router.post('/create-testimonials', addTestimonials);

// Alternative endpoint for review submission (if frontend uses this)
router.post('/submit-review', addTestimonials);

// Get all testimonials
router.get('/get-testimonials', getTestimonials);

// Submit estimate request
router.post('/submit-estimate', submitEstimate);

// Get all estimates
router.get('/get-estimates', getEstimates);

// Delete testimonial by ID
router.delete('/delete-testimonial/:id', deleteTestimonial);

export default router;
