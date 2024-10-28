import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNo, city, qualification, role } = req.body;

        // Check for missing fields
        if (!fullname || !email || !password || !phoneNo || !city || !qualification) {
            return res.status(400).json({
                message: "Some field(s) are missing!",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists!",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNo,
            city,
            qualification,
            role: 'user', // Default role can be set
        });

        res.status(201).json({
            message: "User registered successfully!",
            success: true,
            user: { id: newUser._id, email: newUser.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const logIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check for missing fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Some field(s) are missing!",
                success: false,
            });
        }

        // Find the user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "You are not authorized to access this route.",
                success: false,
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: "Logged in successfully!",
                success: true,
                user: {
                    _id: user._id,
                    name: user.fullname,
                    email: user.email,
                    role: user.role,
                    city: user.city,
                    qualification: user.qualification,
                },
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const logOut = async (req, res) => {
    try {
        // To forget the token stored in cookie
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully!",
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



export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNo, email, bio, skills } = req.body;
        const userId = req.id; // Assuming `req.id` contains the user ID

        // Find the user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exist",
                success: false,
            });
        }

        // Update User data
        if (fullname) user.fullname = fullname;
        if (phoneNo) user.phoneNo = phoneNo;
        if (email) user.email = email;
        if (bio) user.profile.bio = bio || user.profile.bio; // Preserve existing bio if not provided
        if (skills) user.profile.skills = skills.split(",");

        // Save updated user data
        await user.save();

        return res.status(200).json({
            message: "User Updated.",
            user: {
                fullname: user.fullname,
                phoneNo: user.phoneNo,
                email: user.email,
                bio: user.profile.bio,
                skills: user.profile.skills,
            },
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

