import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // date
    dated:{
        type: Date,
        default: Date.now
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
},{
    timestamps: true
})


const Blog = mongoose.model("Blog", blogSchema);
export default Blog