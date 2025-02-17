const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error("Category creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories", details: error.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Failed to fetch category", details: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    
    res.status(200).json(category);
  } catch (error) {
    console.error("Category update error:", error);
    res.status(500).json({ error: "Failed to update category", details: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category", details: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
