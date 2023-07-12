import asyncHandler from "express-async-handler";
import { isEmpty } from "../utils/string.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isRemovalValid, removeFileByName } from "../services/file.js";

// @ desc   Download Files
// @ route  GET /api/v1/dus/file/download
// @ access Private
export const downloadFiles = asyncHandler(async (req, res, next) => {
	const filePath = req.query.filePath;

	if (isEmpty(filePath)) {
		return next(new ErrorResponse(400, `filePath must be present in payload`));
	}

	res.download(filePath);
});

// @ desc   Upload File
// @ route  POST /api/v1/dus/file/upload
// @ access Private
export const uploadFile = asyncHandler(async (req, res, next) => {
	if (req.file && req.file.path) {
		res.status(200).json({
			success: true,
			data: {},
		});
	} else {
		next(new ErrorResponse(500, "Something went wrong"));
	}
});

// @ desc   Remove File
// @ route  DELETE /api/v1/dus/file/remove
// @ access Private
export const removeFile = asyncHandler(async (req, res, next) => {
	const form = req.body?.form;

	if (!isRemovalValid(form)) {
		next(new ErrorResponse(400, "Please provide a valid existing form template name and keep at least one form template"));
	}

	removeFileByName(form);

	res
		.status(200)
		.json({
			success: true,
			data: {},
		})
		.end();
});
