const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMenusByRestaurantId = async (req, res) => {
  const id = req.params.restaurantId;

  // Input validation
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid restaurant ID" });
  }

  try {
    // Check if the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) },
      select: { id: true } // Only select the restaurant ID
    });

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Fetch menus for the restaurant along with their supplements
    const menus = await prisma.menu.findMany({
      where: { restaurantId: parseInt(id) },
      include: {
        supplements: true, // Include supplements
      },
    });

    if (!menus || menus.length === 0) {
      return res.status(404).json({ error: "No menus found for this restaurant" });
    }

    console.log("Menus fetched:", menus);
    res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Failed to fetch menus", details: error.message });
  }
};

// Create menu
const createMenu = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, description, price, imageUrl, supplementIds } = req.body;

  try {
    // Check if the restaurant exists and belongs to the user
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: parseInt(restaurantId),
        userId: req.user.id
      }
    });

    if (!restaurant) {
      return res.status(403).json({ error: "Not authorized to create menu for this restaurant" });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        restaurantId: parseInt(restaurantId),
        supplements: {
          connect: supplementIds.map(id => ({ id }))
        }
      },
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
  const { name, description, price, imageUrl } = req.body;
  const userId = req.user.id;

  try {
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
      data: { name, description, price, imageUrl },
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
  addFoodItem,
  getMenusByRestaurantId
}; 
