const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/AuthModel");

exports.SignUp = async (req, res) => {
  try {
    const { gender, username } = req.body;
    const genderMale = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const genderFemale = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const UserExist = await User.findOne({ email: req.body.email });
    if (UserExist) {
      res.send("User Already exists");
    } else {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(11);
      const hashedPassword = await bcrypt.hash(password, salt);
      const usertobeadded = new User({
        ...req.body,
        password: hashedPassword,
        profilepic: gender === "male" ? genderMale : genderFemale,
      });
      const saveuser = await usertobeadded.save();
      res.send({ msg: "Your account has been created" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.SignIn = async (req, res) => {
  try {
    const ValidateUser = await User.findOne({ email: req.body.email });
    if (ValidateUser) {
      const verify = await bcrypt.compare(
        req.body.password,
        ValidateUser.password
      );

      if (verify) {
        const jwtToken = jwt.sign(
          { userId: ValidateUser._id, email: ValidateUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "15d" }
        );
        res.send({
          status: "Login Successfully",
          userId: ValidateUser._id,
          Username: ValidateUser.username,
          profilepic: ValidateUser.profilepic,
          jwtToken,
        });
      } else {
        res.send({ error: "Password doet not match" });
      }
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
