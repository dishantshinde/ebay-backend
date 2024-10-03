const User = require("../models/userWatchlistmodel"); // User model

// Add or delete product in user's watchlist
const addorDeleteProductWatchlist = async (req, res) => {
  const { email, image, price, description, asin, ishome } = req.body;

  // Validate incoming data
  if (!email || !image || !price || !description || !asin) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the user's watchlist
    const productIndex = user.watchlist.findIndex((item) => item.asin === asin);

    if (productIndex !== -1) {
      // If product exists in the watchlist, remove it
      user.watchlist.splice(productIndex, 1); // Remove the product from watchlist
      await user.save(); // Save updated user
      return res.json({
        message: "Product removed from watchlist",
        watchlist: user.watchlist,
      });
    } else {
      // If product doesn't exist, add it to the watchlist
      user.watchlist.push({
        image,
        price,
        description,
        asin,
        ishome,
        iswatchlist: true,
      });
      await user.save(); // Save updated user
      return res.status(201).json({
        message: "Product added to watchlist",
        watchlist: user.watchlist,
      });
    }
  } catch (err) {
    console.error("Error adding/removing product from watchlist:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all products in the watchlist
const getWatchlistProducts = async (req, res) => {
  const { email } = req.query; // Get the email from the request body

  try {
    // Find the user by email
    console.log("user mail inside ::", email);
    const user = await User.findOne({ email }); // Await the result of the query

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found
    }

    const watchlist = user.watchlist; // Access the user's watchlist
    res.json(watchlist); // Send the watchlist as a response
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    res.status(500).json({ message: "Server error" }); // Handle server error
  }
};

module.exports = {
  addorDeleteProductWatchlist,
  getWatchlistProducts,
};
