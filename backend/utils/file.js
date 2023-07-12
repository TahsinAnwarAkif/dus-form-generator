import fs from "fs";
import path from "path";
import multer from "multer";
import ErrorResponse from "./ErrorResponse.js";

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, process.env.FORM_UPLOADS_PATH);
	},
	filename(req, file, cb) {
		cb(null, file.originalname);
	},
});

const checkFileType = async (req, file, cb) => {
	const supportedFileTypes = /docx|pdf/;
	const supportedFileSize = 10000000;
	const existingFileList = getFileListByDirectory(process.env.FORM_UPLOADS_PATH) || [];
	const fileSize = parseInt(req.headers["content-length"]);

	const isDocxOrPdf = supportedFileTypes.test(path.extname(file.originalname).toLowerCase());
	const isFileAlreadyNotUploaded = !existingFileList.includes(file.originalname);
	const isFileSizeNotExceeded = fileSize <= supportedFileSize;

	if (isDocxOrPdf && isFileAlreadyNotUploaded && isFileSizeNotExceeded) {
		return cb(null, true);
	} else {
		return cb(new ErrorResponse(400, "Please add a valid new docx/pdf file with maximum size of 10 MB"));
	}
};

export const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(req, file, cb);
	},
});

export const getFileListByDirectory = (directory) => {
	return fs.readdirSync(directory) || [];
};
