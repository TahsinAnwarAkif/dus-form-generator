import fs from "fs";
import { getFileListByDirectory } from "../utils/file.js";
import { isNotEmpty } from "../utils/string.js";

export const removeFileByName = (fileName) => {
	const existingFilePath = `${process.env.FORM_UPLOADS_PATH}/${fileName}`;
	const newFilePath = `${process.env.FORM_TRASH_PATH}/${fileName}`;

	fs.renameSync(existingFilePath, newFilePath);
};

export const removeTrashFiles = () => {
	const fileList = getFileListByDirectory(process.env.FORM_TRASH_PATH);

	console.log(`These files from trash folder will be removed: ${fileList}`);

	fileList.forEach((file) => {
		fs.unlinkSync(`${process.env.FORM_TRASH_PATH}/${file}`);
	});
};

export const isRemovalValid = (fileName) => {
	const existingFormList = getFileListByDirectory(process.env.FORM_UPLOADS_PATH);

	return isNotEmpty(fileName) && existingFormList.length > 1 && existingFormList.includes(fileName);
};
