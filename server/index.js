const express = require("express");
const useRouter = require("./Routes/authRoute");
const MessagesRouter = require("./Routes/MessagesRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./Config/connectDb");
const { app, server } = require("./Socket/Socket.js");
require("dotenv").config();

connectDB();
app.use(bodyParser.json({ 
  origin: 'https://chatapp-frontend-tfek.onrender.com/',  
  methods: 'GET,POST,PUT,DELETE',
  limit: "10mb" ,
  credentials: true,
}));
app.use(cors());
app.get("/", (req, res) => {
  res.send( "Server is running 🔥");
});

app.use("/auth", useRouter);
app.use("/message", MessagesRouter);

server.listen(8000, () => {
  console.log("Server has started at 8000");
});
