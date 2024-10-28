import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    city: { type: String, required: true },
    qualification: { type: String, required: true },
    profile: {
      bio: { type: String, default: "" },
      skills: { type: String },
      resume: { type: String }, // URL to resume file
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profileImg: { type: String, default: "" },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },

  });
const User = mongoose.model('User', userSchema);
export default User;