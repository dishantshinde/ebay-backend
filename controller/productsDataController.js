const {
  productsModel,
  allProductsModel,
} = require("../models/productsDatamodel");
const { options } = require("../router/productsDataRoute");

const addProducts = async (req, res) => {
  const { data } = req.body;
  try {
    if (!data.product || !data.deals) {
      return res.status(400).json({
        message: "Data incomplete",
      });
    }
    const newData = new productsModel({
      product: data.product,
      deals: data.deals,
    });
    await newData.save();
    return res.status(201).json({
      message: "products Added to Database successfully",
      newData,
    });
  } catch (error) {
    console.error("Error :", error.message, error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
const addAllProducts = async (req, res) => {
  const search = req.body;
  try {
    await allProductsModel.insertMany(search);
    return res.status(201).json({ message: "all products added to db" });
  } catch (error) {
    console.error("Error :", error.message);
    return res.status(500).json({ message: error.message });
  }
};
const getDashboardProducts = async (req, res) => {
  try {
    const data = await productsModel.find();
    return res.status(200).json(data[0]);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const getProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const products = await allProductsModel.find({
      productTitle: { $regex: `${search}`, $options: "i" },
    });
    return res.status(200).json({ message: "products retreived", products });
  } catch (error) {
    console.error("Error :", error.message);
    return res.json({ message: error.message });
  }
};

module.exports = {
  addProducts,
  addAllProducts,
  getProducts,
  getDashboardProducts,
};
