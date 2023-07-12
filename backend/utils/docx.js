import { getCurrentDate } from "./common.js";
import { isEmpty } from "./string.js";
import { STAMPABLE_FIELD_LIST, DOCX_FILE_FORMAT } from "./constants.js";

export const stampDocxData = (docx, entry) => {
	let idx = 0;

	const data = {
		[STAMPABLE_FIELD_LIST[idx++]]: getCurrentDate(),
		[STAMPABLE_FIELD_LIST[idx++]]: entry.clientEmail,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.projectName,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.projectAddress,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.projectCityStateZip,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.apn,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.companyName,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.companyAddress,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.companyCityStateZip,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.signatoryName,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.signatoryTitle,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.signatoryPhone,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.signatoryEmail,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.siteLLC,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.siteLLCAddress,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.siteLLCCityStateZip,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.job,
		[STAMPABLE_FIELD_LIST[idx++]]: entry.municipality,
		a: "b",
	};

	for (let attr in data) {
		if (isEmpty(data[attr])) {
			data[attr] = "";
		}
	}

	docx.setData(data);

	return docx;
};

export const getDownloadDocxFilePath = (fileName) => {
	return `${process.env.FORM_DOWNLOADS_PATH}/${fileName.split(DOCX_FILE_FORMAT)[0]}-${new Date().getTime()}${DOCX_FILE_FORMAT}`;
};
