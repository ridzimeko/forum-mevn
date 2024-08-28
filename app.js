import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/authRouter.js";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Parent router
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Ini adalah pesan",
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Database
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log("Database connected"))
	.catch((err) => {
		console.error(error.message);
	});
