import {
	GOOGLE_SPREADSHEET_COLUMN_ID_IDX,
	GOOGLE_SPREADSHEET_COLUMN_CLIENT_EMAIL_IDX,
	GOOGLE_SPREADSHEET_COLUMN_TIMESTAMP_IDX,
	GOOGLE_SPREADSHEET_COLUMN_PROJECT_NAME_IDX,
	GOOGLE_SPREADSHEET_COLUMN_PROJECT_ADDRESS_IDX,
	GOOGLE_SPREADSHEET_COLUMN_PROJECT_CITY_STATE_ZIP_IDX,
	GOOGLE_SPREADSHEET_COLUMN_APN_IDX,
	GOOGLE_SPREADSHEET_COLUMN_COMPANY_NAME_IDX,
	GOOGLE_SPREADSHEET_COLUMN_COMPANY_ADDRESS_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_NAME_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_TITLE_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_PHONE_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_EMAIL_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_ADDRESS_IDX,
	GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_STATE_CITY_ZIP_IDX,
	GOOGLE_SPREADSHEET_COLUMN_COMPANY_CITY_STATE_ZIP_IDX,
} from "./constants.js";

export const generateFormData = (entry, job, municipality) => {
	return {
		id: entry[GOOGLE_SPREADSHEET_COLUMN_ID_IDX],
		timestamp: entry[GOOGLE_SPREADSHEET_COLUMN_TIMESTAMP_IDX],
		clientEmail: entry[GOOGLE_SPREADSHEET_COLUMN_CLIENT_EMAIL_IDX],
		projectName: entry[GOOGLE_SPREADSHEET_COLUMN_PROJECT_NAME_IDX],
		projectAddress: entry[GOOGLE_SPREADSHEET_COLUMN_PROJECT_ADDRESS_IDX],
		projectCityStateZip: entry[GOOGLE_SPREADSHEET_COLUMN_PROJECT_CITY_STATE_ZIP_IDX],
		apn: entry[GOOGLE_SPREADSHEET_COLUMN_APN_IDX],
		companyName: entry[GOOGLE_SPREADSHEET_COLUMN_COMPANY_NAME_IDX],
		companyAddress: entry[GOOGLE_SPREADSHEET_COLUMN_COMPANY_ADDRESS_IDX],
		companyCityStateZip: entry[GOOGLE_SPREADSHEET_COLUMN_COMPANY_CITY_STATE_ZIP_IDX],
		signatoryName: entry[GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_NAME_IDX],
		signatoryTitle: entry[GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_TITLE_IDX],
		signatoryPhone: entry[GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_PHONE_IDX],
		signatoryEmail: entry[GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_EMAIL_IDX],
		siteLLC: entry[GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_IDX],
		siteLLCAddress: entry[GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_ADDRESS_IDX],
		siteLLCCityStateZip: entry[GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_STATE_CITY_ZIP_IDX],
		job,
		municipality,
	};
};

export const getCurrentDate = () => {
	const date = new Date();

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return date.toLocaleString("en-US", options);
};
