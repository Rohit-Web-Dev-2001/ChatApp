const { default: mongoose } = require("mongoose");
const User = require("../Model/AuthModel");

exports.getConfirmedfriends = async (req, res) => {
  try {
    const Id = req.authorizedUser;

    const friendsData = await User.findOne({ _id: Id }).select("friends");

    if (friendsData) {
      res.status(200).json({
        success: true,
        message: "Friends data retrieved successfully",
        data: friendsData.friends,
      });
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// [
//   { _id: "123", username: "Alice" },
//   { _id: "456", username: "Bob" }
// ]

// Think mein friends array mein profile pic bhi daal deta hu ek api se kaam chal jaayega
