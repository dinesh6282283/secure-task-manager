const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth.js");
const taskRoute = require("./routes/tasks.js");
const connectDB = require("./config/db.js");
const cors = require("cors");

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://secure-task-manager.vercel.app"],
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDB();
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
