const { default: mongoose } = require("mongoose");
const ChatAppauthSchema = mongoose.Schema({
  firstname: {
    type: String,
    unique: true,
    required: true,
  },
  lastname: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  profilepic: {
    type: String,
  },
  friends:{
    type:Array,
  },

  friendsRequest:{
    type:Array,
  }, // incomming friendRequest  

  RequestedFriend:{
    type:Array,
  }, // status of Requested user
  gender:{
    type:String,
  }
});

const User = mongoose.model("ChatAppAuth", ChatAppauthSchema);
module.exports = User;
