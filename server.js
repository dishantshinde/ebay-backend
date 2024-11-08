const express = require("express");
const connectDB = require("./config/db");
const watchlistroutes = require("./router/userwatclistRouter");
const userroutes = require("./router/userRouter");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ebay-clone-osa8.onrender.com"], // allow requests from your React app
    methods: "GET,POST,PUT,DELETE", // allowed HTTP methods
    credentials: true, // if your frontend sends cookies
  })
);

connectDB();

app.use("/api", userroutes);
app.use("/api/watchlist", watchlistroutes);

app.get("/", (req, res) => {
  res.send("welcome to ecommerce backend");
});
app.listen(8000, () => [console.log("server running on port 8000!")]);
