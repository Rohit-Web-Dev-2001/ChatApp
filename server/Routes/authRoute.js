const express = require("express");
const { SignIn, SignUp } = require("../Controllers/AuthControllers");
const { Suggestedfriends } = require("../Controllers/Suggestedfriend");
const jwtverification = require("../Middlewares/JwtVerfication");
const {
  getfriends,
  getConfirmedfriends,
} = require("../Controllers/chatsusercontroller");
const {
  addFriend,
  moveFriendRequestsToFriends,
  getfriendRequests,
} = require("../Controllers/AddFriendController");
const useRouter = express.Router();

useRouter.post("/SignIn", SignIn);
useRouter.post("/suggestedFriends", jwtverification, Suggestedfriends); // add authticator middleware
useRouter.post("/getfriends",jwtverification,  getConfirmedfriends);
useRouter.get("/getfriendRequests", jwtverification, getfriendRequests);
useRouter.post("/addfriends/:id", addFriend); // push to frendrequest array
useRouter.get("/confirmfriend/:id",jwtverification, moveFriendRequestsToFriends); // push to both side to friend array
useRouter.post("/SignUp", SignUp);
module.exports = useRouter;
  