import { invokeGetApi, invokePostApi } from "../utils/api";
import { POST_FORM_GENERATION_URL, GET_FORM_METADATA_URL } from "../utils/constants";

export const getFormMetadata = async () => {
	const { data } = await invokeGetApi(GET_FORM_METADATA_URL);

	return data;
};

export const generateForm = async (form, entryId, job, municipality) => {
	const payload = {
		form,
		entryId,
		job,
		municipality,
	};
	const { data } = await invokePostApi(POST_FORM_GENERATION_URL, payload);

	return data;
};
