const express = require("express");
const useRouter = require("./Routes/authRoute");
const MessagesRouter = require("./Routes/MessagesRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./Config/connectDb");
const { app, server } = require("./Socket/Socket.js");
require("dotenv").config();

connectDB();
// Parse JSON bodies (max size 10mb)
app.use(bodyParser.json({ limit: "10mb" }));

// Enable CORS for frontend
app.use(cors({
  origin: ["https://chatapp-frontend-tfek.onrender.com", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.get("/", (req, res) => {
  res.send( "Server is running 🔥");
});

app.use("/auth", useRouter);
app.use("/message", MessagesRouter);

server.listen(8000, () => {
  console.log("Server has started at 8000");
});
