const bcrypt = require('bcryptjs');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');


const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword, // Save hashed password
        });
        res.status(201).json({ message: "User saved successfully", user });
    } catch (error) { 
        res.status(500).json({ message: "Internal error", error });
    }
};

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            
            res.status(200).json({ message: "Login successful", user, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) { 
        res.status(500).json({ message: "Internal error", error });
    }
};


const getUser = async (req, res) => {
//  console.log(req)
 console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
};

module.exports = { UserRegister, UserLogin, getUser };
