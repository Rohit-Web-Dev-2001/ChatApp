const { default: mongoose } = require("mongoose");

exports.connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGODB_URL);
    if(connectDB){
        console.log("MongoDb is connected");
    }
  } catch (error) {
    console.log(error);
  }
};
