const { default: mongoose } = require("mongoose");
const MessageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String },
  },
  { timestamps: true }
);
const Message = mongoose.model("Messages", MessageSchema);
module.exports = Message;
