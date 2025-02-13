const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create rating
const createRating = async (req, res) => {
  const { restaurantId, score, comment } = req.body;
  const userId = req.user.id;

  try {
    // Check if user has ordered from this restaurant
    const hasOrdered = await prisma.order.findFirst({
      where: {
        userId,
        restaurantId: parseInt(restaurantId),
        status: 'DELIVERED'
      }
    });

    if (!hasOrdered) {
      return res.status(403).json({ error: "You can only rate restaurants you've ordered from" });
    }

    // Check if user has already rated this restaurant
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        restaurantId: parseInt(restaurantId)
      }
    });

    if (existingRating) {
      return res.status(400).json({ error: "You have already rated this restaurant" });
    }

    const rating = await prisma.rating.create({
      data: {
        userId,
        restaurantId: parseInt(restaurantId),
        score,
        comment
      },
      include: {
        User: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(201).json(rating);
  } catch (error) {
    console.error("Rating creation error:", error);
    res.status(500).json({ error: "Failed to create rating", details: error.message });
  }
};

// Get restaurant ratings
const getRestaurantRatings = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const ratings = await prisma.rating.findMany({
      where: {
        restaurantId: parseInt(restaurantId)
      },
      include: {
        User: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate average rating
    const averageRating = ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length || 0;

    res.status(200).json({
      ratings,
      averageRating,
      totalRatings: ratings.length
    });
  } catch (error) {
    console.error("Ratings fetch error:", error);
    res.status(500).json({ error: "Failed to fetch ratings", details: error.message });
  }
};

// Update rating
const updateRating = async (req, res) => {
  const { id } = req.params;
  const { score, comment } = req.body;
  const userId = req.user.id;

  try {
    const rating = await prisma.rating.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    if (rating.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to update this rating" });
    }

    const updatedRating = await prisma.rating.update({
      where: { id: parseInt(id) },
      data: {
        score,
        comment
      },
      include: {
        User: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(200).json(updatedRating);
  } catch (error) {
    console.error("Rating update error:", error);
    res.status(500).json({ error: "Failed to update rating", details: error.message });
  }
};

module.exports = {
  createRating,
  getRestaurantRatings,
  updateRating
}; 