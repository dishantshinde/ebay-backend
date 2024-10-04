const { default: mongoose } = require("mongoose");
const User = require("../models/userWatchlistmodel");

const addOrdersOfUser = async (req, res) => {
  const { email, cartlist, order } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new order object with items and order details
    const newOrder = {
      items: cartlist.map((item) => ({
        image: item.image,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      order: {
        totalItems: order.totalItems,
        totalAmount: order.totalAmount, // Corrected the typo
      },
    };

    // Push the new order to the user's orders array
    user.orders.push(newOrder);

    // Save the user document
    await user.save();

    return res.status(201).json({
      message: "Order added to the user's orders",
      orders: user.orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const allOrders = async (req, res) => {
  const { email } = req.query;

  try {
    // Await the result of User.findOne
    const user = await User.findOne({ email });

    if (!user) {
      // Return a 400 status if user not found
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Return the user's orders with a 200 status code
    res.status(200).json({
      data: user.orders,
    });
  } catch (err) {
    // Handle errors and return a 500 status code
    res.status(500).json({
      message: err.message,
    });
  }
};
const removeOrder = async (req, res) => {
  const { email, id } = req.body; // Extract id from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Find the index of the order with the specified id
    const orderIndex = user.orders.findIndex((ele) => ele.id === id);

    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Remove the order from the user's orders array
    user.orders.splice(orderIndex, 1);
    await user.save(); // Don't forget to save the changes

    res.status(200).json({ message: "Order removed successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addOrdersOfUser, allOrders, removeOrder };
