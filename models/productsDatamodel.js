const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productPhoto: { type: String, required: true },
  productPrice: { type: String, required: true },
  productTitle: { type: String, required: true },
  productAsin: { type: String, required: true },
});

const dealsSchema = new mongoose.Schema({
  dealBadge: { type: String, required: true },
  dealTitle: { type: String, required: true },
  dealPhoto: { type: String, required: true },
  dealUrl: { type: String, required: true },
  dealType: { type: String, required: true },
  dealId: { type: String, required: true },
  productAsin: { type: String, required: true },
});

const productDataSchema = new mongoose.Schema({
  product: { type: [productsSchema], required: true },
  deals: { type: [dealsSchema], required: true },
});

const allProductsSchema = new mongoose.Schema(
  {
    productPhoto: { type: String, required: true },
    productPrice: { type: String, required: false },
    productTitle: { type: String, required: true },
    productAsin: { type: String, required: true },
  },
  { strict: false }
);

const productsModel = mongoose.model("productsData", productDataSchema);
const allProductsModel = mongoose.model(
  "AllEcommerceproducts",
  allProductsSchema
);

module.exports = { productsModel, allProductsModel };
