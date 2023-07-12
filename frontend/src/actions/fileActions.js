import { POST_FILE_REMOVE_URL, POST_FILE_UPLOAD_URL } from "../utils/constants";
import { invokePostApi } from "../utils/api";

export const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append("form", file);

	const { data } = await invokePostApi(POST_FILE_UPLOAD_URL, formData, {
		"Content-Type": "multipart/form-data",
	});

	return data;
};

export const removeFile = async (file) => {
	const payload = { form: file };
	const { data } = await invokePostApi(POST_FILE_REMOVE_URL, payload);

	return data;
};
