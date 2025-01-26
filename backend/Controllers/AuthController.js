const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        console.log("hishflsasf");
        const { name, email, password,time} = req.body;
        console.log("response", req.body);

    // Validate required fields
    if (!name || !email || !password || !time ) {
      return res.status(400).json({
        message: "All fields are required, including date of birth.",
        success: false,
      });
    }

    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login.",
        success: false,
      });
    }

    // Create new user
    const userModel = new UserModel({ name, email, password,time });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({
      message: "Signup successful!",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, dob } = req.body;
//         console.log("data", req.body)
//         const user = await UserModel.findOne({ email });
//         if (user) {
//             // dob;
//             return res.status(409)
//                 .json({ message: 'User is already exist, you can login', success: false });
//         }
//         const userModel = new UserModel({ name, email, password,dob });
//         userModel.password = await bcrypt.hash(password, 10);
//         await userModel.save();
//         res.status(201)
//             .json({
//                 message: "Signup successfully",
//                 success: true
//             })
//     } catch (err) {
//         res.status(500)
//             .json({
//                 message: "Internal server errror",
//                 success: false
//             })
//     }
// }


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req.body", req.body);
        const user = await UserModel.findOne({ email });
        console.log("user ", user);
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            console.log("I am here");
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}