import express from "express";
import { logIn, register,updateProfile , logOut} from "../controllers/user.controller.js";
import isAutheticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route('/signup').post(register);
router.route('/login').post(logIn);
router.route('/profile/update').post(isAutheticated,updateProfile);
router.route("/logout").get(logOut)
export default router;