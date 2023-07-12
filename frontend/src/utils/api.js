import axios from "axios";
import ErrorResponse from "./ErrorResponse.js";

export const invokeGetApi = async (apiUrl, additionalHeaders = {}, skipIfError = true) => {
	const response = await axios.get(apiUrl, getHeaders(additionalHeaders)).catch((err) => {
		if (!skipIfError) {
			throw new ErrorResponse(err.response.status, `Unable to Establish connection with API URL: ${apiUrl}, error: ${err.message}`);
		} else {
			console.log(`Unable to Establish connection with API URL: ${apiUrl}, error: ${err.message}`);
			return "";
		}
	});

	return {
		data: Object.keys(response).length !== 0 ? response.data : {},
		status: Object.keys(response).length !== 0 ? response.status : 400,
	};
};

export const invokePostApi = async (apiUrl, payload, additionalHeaders = {}, skipIfError = true) => {
	const response = await axios.post(apiUrl, payload, getHeaders(additionalHeaders)).catch((err) => {
		if (!skipIfError) {
			throw new ErrorResponse(err.response.status, `Unable to Establish connection with API URL: ${apiUrl}, error: ${err.message}`);
		} else {
			console.log(`Unable to Establish connection with API URL: ${apiUrl}, error: ${err.message}`);
			return "";
		}
	});

	return {
		data: Object.keys(response).length !== 0 ? response.data : {},
		status: Object.keys(response).length !== 0 ? response.status : 400,
	};
};

const getHeaders = (additionalHeaders) => {
	return {
		headers: {
			"Cache-Control": "no-cache",
			Authorization: `${process.env.REACT_APP_REQUIRED_API_KEY}`,
			...additionalHeaders,
		},
	};
};
