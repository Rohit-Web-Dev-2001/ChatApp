const { default: mongoose } = require("mongoose");
const User = require("../Model/AuthModel");

exports.Suggestedfriends = async (req, res) => {
  try {
    const excludedId = req.authorizedUser; // loggedIn userId E.g Shivani
    const excludedFriends = await User.findOne({ _id: excludedId }).select(
      "friends friendsRequest RequestedFriend"
    ); //extracting logged in user id array

    const ExtractingFriends = excludedFriends.friends.map((ele) => ele.id); // Extracting loggedIn( shivani's) User's friends id to exclude them
    const ExtractingfriendsRequestID = excludedFriends.friendsRequest.map(
      (ele) => ele.id
    ); // Extracting loggedIn( shivani's) User's friendsRequest id to exclude them

    const RequestedToBeFriendId = excludedFriends.RequestedFriend.map(
      (ele) => ele.id
    ); // Extracting loggedIn( shivani's) User's friendsRequest id to exclude them
    const mergeIds = [
      excludedId,
      ...ExtractingFriends,
      ...ExtractingfriendsRequestID,
      ...RequestedToBeFriendId,
    ];

    const results = await User.find({ _id: { $nin: mergeIds } });
    const results2 = await User.findOne({ _id: excludedId }).select(
      "RequestedFriend "
    );

    if (results) {
      const filterData = results.map((ele) => {
          return {
            id: ele._id,
            name: ele.username,
            profilepic: ele.profilepic,
          };
      });

      const ResponsingArray = [
        ...results2.RequestedFriend,
        ...filterData,
        ...excludedFriends.friendsRequest,
      ];

      res.send(ResponsingArray); // Array of objects with specific key-value pairs
      
    } else {
      res.send("Cannot able to connect");
    }
  } catch (error) {
    console.log(error);
  }
};
