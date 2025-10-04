import Testimonials from "../Model/TestimonialModel.js";
import RequestEstimate from "../Model/RequestEstimateModel.js";
import { sendEstimateNotification } from '../utils/emailService.js';

export const addTestimonials = async (req, res) => {
    try {
        // Validate required fields
        const { name, rating, content } = req.body;
        
        if (!name || !rating || !content) {
            return res.status(400).json({ 
                message: "Name, rating, and content are required fields" 
            });
        }

        // Validate rating is between 1 and 5
        if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return res.status(400).json({ 
                message: "Rating must be an integer between 1 and 5" 
            });
        }

        const testimonial = new Testimonials({
            name: name.trim(),
            rating: parseInt(rating),
            content: content.trim()
        });
        
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error("Error creating testimonial:", err);
        res.status(400).json({ message: err.message });
    }
};

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find().sort({ date: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const submitEstimate = async (req, res) => {
    try {
        const { fullName, email, phone, serviceRequested } = req.body;

        const newEstimate = new RequestEstimate({
            customerName: fullName,
            email,
            phone,
            service: serviceRequested
        });

        const savedEstimate = await newEstimate.save();
        
        // Send email notification
        await sendEstimateNotification(savedEstimate);
        
        res.status(201).json({ 
            success: true,
            message: 'Estimate submitted successfully! We will contact you soon.' 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        }); 
    }
};






// export const getApprovedTestimonials = async (req, res) => {
//     try {
//         const testimonials = await RequestTestimonial.find({ approved: true })
//         res.json(testimonials);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



// i remove the approved so give me api just to get the testimonials
export const getEstimates = async (req, res) => {
    try {
        const estimates = await RequestEstimate.find()
        res.json(estimates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestimonial = await Testimonials.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};