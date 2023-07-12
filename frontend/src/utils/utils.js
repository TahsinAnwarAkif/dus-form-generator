import { hashText } from "./bcrypt";
import { GET_FILE_DOWNLOAD_URL, messages } from "./constants";

export const getFileDownloadUrl = async (filePath) => {
	const authorization = await hashText(process.env.REACT_APP_REQUIRED_API_KEY);

	return `${GET_FILE_DOWNLOAD_URL}?filePath=${filePath}&authorization=${authorization}`;
};

export const getDownloadableFileName = (fileDownloadUrl) => {
	const fileDownloadPath = process.env.REACT_APP_FORM_DOWNLOADS_PATH;
	const beginIdx = fileDownloadUrl.indexOf(GET_FILE_DOWNLOAD_URL + `?filePath=${fileDownloadPath}`) + (GET_FILE_DOWNLOAD_URL + `?filePath=${fileDownloadPath}`).length;
	const endIdx = fileDownloadUrl.indexOf("&authorization=");

	return fileDownloadUrl.substring(beginIdx, endIdx);
};

export const getMsgWithParams = (msgKey, language = "en", ...params) => {
	const msgWithParams = getMsg(msgKey, language);
	let msg = msgWithParams;

	params?.length !== 0 &&
		params.forEach((param, idx) => {
			msg = msg.replace(`{${idx}}`, param);
		});

	return msg;
};

export const getMsg = (msgKey, language = "en") => {
	return messages[language][msgKey];
};

export const isNotEmpty = (str) => {
	return !isEmpty(str);
};

export const isEmpty = (str) => {
	return !str || str.trim() === "";
};
