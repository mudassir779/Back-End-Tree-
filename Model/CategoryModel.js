import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }],
    slug: {
        type: String,
        unique: true,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;



