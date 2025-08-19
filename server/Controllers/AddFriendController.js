const User = require("../Model/AuthModel");

exports.addFriend = async (req, res) => {
  try {
    const id = req.params.id; // id of that user
    const friendReq = req.body; // user name profile pic and id of a loggedIn User

    const findUser = await User.findOne({ _id: id }).select("-password"); // Add Friend User Data
    const addingkeysofRecieverUser = {
      id: findUser.id,
      name: findUser.username,
      profilepic: findUser.profilepic,
      status: "requested",
    }; // Add Friend Data of that user  // Stored In LoggeDIN User
    const addingkeysofRequestedUser = { ...friendReq, status: "pendding" }; // loggedInUserData //Stored in add user Data

    const FriendReqestToBeSent = await User.updateOne(
      { _id: id },
      { $push: { friendsRequest: addingkeysofRequestedUser } }
    ); // sending Shivani Data To Ravi

    if (FriendReqestToBeSent) {
      const FriendReqestSendedByusr = await User.updateOne(
        { _id: friendReq.id },
        { $push: { RequestedFriend: addingkeysofRecieverUser } }
      ); // Storing Ravi Data in LoggedId Id E.g Shivani

      res.send({
        msg: "Friend Request has been sent",
      });
    } else {
      res.send("Something is missing");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getfriendRequests = async (req, res) => {
  try {
    const getfriendRequest = await User.findOne({
      _id: req.authorizedUser,
    }).select("friendsRequest");
    if (getfriendRequest) {
      res.send(getfriendRequest.friendsRequest);
    } else {
      res.send("Something went Wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.moveFriendRequestsToFriends = async (req, res) => {
  try {
    const LogedInid = req.authorizedUser; // confirm the friend req user
    const Requestedid = req.params.id; // requested user id
    const LogedInUSer = await User.findById(LogedInid).select("-password");
    const Requesteduser = await User.findById(Requestedid).select("-password");

    if (LogedInUSer && Requesteduser) {
      // Combine the current friends and friendRequest arrays
      const RequestedObject = LogedInUSer.friendsRequest.find(
        (obj) => obj.id === Requestedid
      ); // send this object to Ravi means loggedIn User

      const LoggedInObject = Requesteduser.RequestedFriend.find(
        (obj) => obj.id === LogedInid
      ); // send this user to Requested User means Shivani

      // getting delting stauts from each user object
      await LogedInUSer.friends.push({
        id: RequestedObject.id,
        name: RequestedObject.name,
        profilepic: RequestedObject.profilepic,
      }); // Push Shivani object To Ravi Friends ArrayLoggedInObject
      await Requesteduser.friends.push({
        id: LoggedInObject.id,
        name: LoggedInObject.name,
        profilepic: LoggedInObject.profilepic,
      }); // Push Ravi obect in Shivani's Friends Array
      await LogedInUSer.friendsRequest.pop(Requestedid); // pop Shivani Object from Ravi's FriendReq Array

      await Requesteduser.RequestedFriend.pop(LogedInid); // pop Ravi Object from Shivani's RequestedFriend Array
      await Requesteduser.save();
      await LogedInUSer.save();

      res.send(LogedInUSer.friendsRequest);
    } else {
      res.send("Something Went Wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
