import Blog from "../Model/BlogModel.js";
import Category from "../Model/CategoryModel.js";
import Request from "../Model/RequestModel.js";

const getData = async (req, res) => {
    try {
        const blogCount = await Blog.countDocuments();
        const categoryCount = await Category.countDocuments();
        const pendingCount = await Request.find({ "Status": "Pending" }).countDocuments();
        const completedCount = await Request.find({ "Status": "Completed" }).countDocuments();

        res.status(200).json({
            blogCount,
            categoryCount,
            pendingCount,
            completedCount,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export default getData;