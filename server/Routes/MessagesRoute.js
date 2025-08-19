const express = require("express");
const { SignIn, SignUp } = require("../Controllers/AuthControllers");
const { Suggestedfriends } = require("../Controllers/Suggestedfriend");
const jwtverification = require("../Middlewares/JwtVerfication");
const {  getMessages, sendMessage } = require("../Controllers/messageController");

const MessagesRouter = express.Router();

MessagesRouter.get("/getmessages/:id",jwtverification,getMessages);
MessagesRouter.post("/sendMessages/:id",jwtverification,sendMessage);
module.exports = MessagesRouter;
