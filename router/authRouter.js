import express from "express";
import {
	LoginUser,
	RegisterUser,
	LogoutUser,
	GetUser,
} from "../controllers/authController.js";
import {
	authMiddleware,
	permissionUser,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/getuser", authMiddleware, GetUser);
router.get("/test", authMiddleware, permissionUser("admin"), (req, res) => {
	return res.send("Berhasil");
});
export default router;
