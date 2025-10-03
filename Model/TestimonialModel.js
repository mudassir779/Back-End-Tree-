import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  content: String,
  date: { type: Date, default: Date.now }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;