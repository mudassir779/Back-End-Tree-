import Category from "../Model/CategoryModel.js";
import slugify from "slugify";

export const addCategory = async (req, res) => {
  try {
    let { title, slug } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    slug = slugify(title, { lower: true });

    const newCategory = new Category({
      title,
      slug
    });
    await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find().populate("blogs");
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);
  }
};

export const categoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({slug}).populate("blogs");
    
    res.status(200).json({
      success: true,
      category
    });

  } catch (err) {
    console.error(err);
  }

}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category_blogs = await Category.findById(id);
    if (category_blogs.blogs.length > 0) {
      return res.status(400).json({ message: "Category has blogs in it. Can't be deleted" });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { title } = req.body
    const category = Category.findByIdAndUpdate(id, { title, slug: slugify(title) }, { new: true }).lean();
    res.status(200).json({
      success: true,
      category: category
    });

  } catch (err) {
    console.error(err)

  }

}