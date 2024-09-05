import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		return next(
			res.status(401).json({
				message: "Anda tidak boleh mengakses halaman ini",
			}),
		);
	}

	let decoded;
	try {
		decoded = await jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		next(
			res.status(401).json({
				message: "Token yang dimasukkan salah/tidak ada",
			}),
		);
		return;
	}

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			res.status(401).json({
				message: "User tidak ditemukan/terhapus",
			}),
		);
	}

	req.user = currentUser;

	next();
};

export const permissionUser = (...roles) => {
	return (req, res, next) => {
		// admin
		if (!roles.includes(req.user.role)) {
			return next(
				res.status(403).json({
					message: "Role anda tidak bisa mengakses halaman ini",
				}),
			);
		}

		next();
	};
};
