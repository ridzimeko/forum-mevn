import express from "express";
import {
	LoginUser,
	RegisterUser,
	LogoutUser,
	GetUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/getuser", authMiddleware, GetUser);

export default router;
