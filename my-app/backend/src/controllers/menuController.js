const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create menu
const createMenu = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    // Check if the restaurant exists and belongs to the user
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: parseInt(restaurantId),
        userId: userId
      }
    });

    if (!restaurant) {
      return res.status(403).json({ error: "Not authorized to create menu for this restaurant" });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        restaurantId: parseInt(restaurantId)
      },
      include: {
        restaurant: true,
        foods: true
      }
    });

    res.status(201).json(menu);
  } catch (error) {
    console.error("Menu creation error:", error);
    res.status(500).json({ error: "Failed to create menu", details: error.message });
  }
};

// Update menu
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;

  try {
    // Check if the menu exists and belongs to the user's restaurant
    const menu = await prisma.menu.findFirst({
      where: {
        id: parseInt(id),
        restaurant: {
          userId: userId
        }
      }
    });

    if (!menu) {
      return res.status(403).json({ error: "Not authorized to update this menu" });
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: { name },
      include: {
        restaurant: true,
        foods: true
      }
    });

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Menu update error:", error);
    res.status(500).json({ error: "Failed to update menu", details: error.message });
  }
};

// Add food item to menu
const addFoodItem = async (req, res) => {
  const { menuId } = req.params;
  const { name, description, price, imageUrl, categoryIds } = req.body;
  const userId = req.user.id;

  try {
    // Check if the menu exists and belongs to the user's restaurant
    const menu = await prisma.menu.findFirst({
      where: {
        id: parseInt(menuId),
        restaurant: {
          userId: userId
        }
      }
    });

    if (!menu) {
      return res.status(403).json({ error: "Not authorized to add food to this menu" });
    }

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        menuId: parseInt(menuId),
        categories: {
          create: categoryIds?.map(categoryId => ({
            categoryId: parseInt(categoryId)
          })) || []
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("Food creation error:", error);
    res.status(500).json({ error: "Failed to create food item", details: error.message });
  }
};

module.exports = {
  createMenu,
  updateMenu,
  addFoodItem
}; 