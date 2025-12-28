const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes"); // 🔥 also fix case
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;   // 🔥 Render dynamic port
app.listen(PORT, () => console.log("Server running on port", PORT));
