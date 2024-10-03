const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongopw = process.env.MONGO_PW;
const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://dishantshinde13:${mongopw}@cluster0.imh2xjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("error connecting to db:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
