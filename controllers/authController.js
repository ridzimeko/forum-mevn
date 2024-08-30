import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);
	const cookieOption = {
		expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
		httpOnly: true,
		security: false,
	};

	res.cookie("jwt", token, cookieOption);
	user.password = undefined;

	res.status(statusCode).json({
		data: user,
	});
};

export const RegisterUser = asyncHandler(async (req, res) => {
	const isFirstAccount = (await User.countDocuments()) === 0;
	const role = isFirstAccount ? "admin" : "user";
	const createUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		role,
	});

	createSendToken(createUser, 201, res);
});

export const LoginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// validasi jika emali dan password kosong
	if (!email && !password) {
		res.status(400);
		throw new Error("Inputan email dan password tidak boleh kosong");
	}

	// check email sudah terdaftar di DB
	const userData = await User.findOne({ email: email });

	if (userData && (await userData.comparePassword(password))) {
		createSendToken(userData, 200, res);
	} else {
		res.status(400);
		throw new Error("Invalid user");
	}
});

export const LogoutUser = (req, res) => {
	res.cookie("jwt", "", {
		expire: new Date(0),
		httpOnly: true,
		security: false,
	});

	res.status(200).json({
		message: "Logout berhasil",
	});
};

export const GetUser = async (req, res) => {
	const user = await User.findById(req.user.id).select({ password: 0 });

	if (user)
		return res.status(200).json({
			data: user,
		});

	return res.status(400).json({
		message: "User tidak ditemukan",
	});
};
