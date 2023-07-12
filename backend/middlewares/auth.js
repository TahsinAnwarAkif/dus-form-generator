import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.js";
import { PUBLIC_URL_LIST } from "../utils/constants.js";
import bcrypt from "bcryptjs";

export const authenticate = asyncHandler(async (req, res, next) => {
	if (!process.env.REQUIRED_API_KEY) {
		return next(new ErrorResponse(503, "Please provide REQUIRED_API_KEY in your config file"));
	}

	const isPublicUrl = PUBLIC_URL_LIST.some((url) => req.originalUrl.includes(url));

	if (!isPublicUrl) {
		const apiKey = req.headers.authorization;

		if (!apiKey || apiKey !== process.env.REQUIRED_API_KEY) {
			return next(new ErrorResponse(401, "Unauthorized! Please provide valid API Key in your request"));
		}
	} else {
		const apiKey = req.query.authorization;

		if (!apiKey || !bcrypt.compareSync(process.env.REQUIRED_API_KEY, apiKey)) {
			return next(new ErrorResponse(401, "Unauthorized! Please provide valid API Key in your request"));
		}
	}

	next();
});
