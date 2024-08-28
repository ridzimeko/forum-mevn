import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

export const RegisterUser = async (req, res) => {
	try {
		const createUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		createSendToken(createUser, 201, res);
	} catch (error) {
		return res.status(400).json({
			message: "Error",
			error: error.message,
		});
	}
};

export const LoginUser = (req, res) => {
	res.send("Login berhasil");
};

export const LogoutUser = (req, res) => {
	res.send("Logout berhasil");
};

export const GetUser = (req, res) => {
	res.send("Get User berhasil");
};
