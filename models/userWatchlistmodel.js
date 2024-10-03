const mongoose = require("mongoose");

// Watchlist Schema (for each product in the user's watchlist)
const watchlistSchema = new mongoose.Schema({
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  asin: { type: String, required: true, sparse: true },
  ishome: { type: Boolean },
  iswatchlist: { type: Boolean, default: true },
});

// Cart Items Schema (for items in a user's cart or order)
const cartitemsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true }, // Changed price to Number
});

// Order Details Schema
const orderDetailsSchema = new mongoose.Schema({
  totalItems: { type: Number, required: true },
  totalAmount: { type: Number, required: true }, // 'totalAmmount' typo corrected
});

// Orders Schema (for storing all user orders)
const ordersSchema = new mongoose.Schema({
  items: [cartitemsSchema], // Array of cart items
  order: orderDetailsSchema, // Order details
});

// User Schema (with email, watchlist, and orders)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  watchlist: [watchlistSchema], // Array of watchlist items
  orders: [ordersSchema], // Array of orders
});

const User = mongoose.model("ebayUser", userSchema);

module.exports = User;
