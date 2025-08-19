const { Socket } = require("socket.io");
const Message = require("../Model/Message");
const { getReceiverSocketId, io } = require("../Socket/Socket");

exports.getMessages = async (req, res) => {
  try {
    const MyId = req.authorizedUser;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: MyId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: MyId },
      ],
    });

    res.send(messages);
  } catch (error) {
    console.log(error);
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.authorizedUser;
    const { id: receiverId } = req.params;

    const newMessage = new Message({
      senderId,
      receiverId: receiverId,
      text,
    });
    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId); // reciverSocketId
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessages", newMessage);
    }
    res.send(newMessage);
  } catch (error) {
    console.log(error);
  }
};
