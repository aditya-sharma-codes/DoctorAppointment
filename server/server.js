const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./db/conn");
require("./controllers/socket");

const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000; // Render/Heroku will set process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
