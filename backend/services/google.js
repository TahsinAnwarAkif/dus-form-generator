import { GOOGLE_SPREADSHEET_COLUMN_ID_IDX } from "../utils/constants.js";
import { google } from "googleapis";
import { getAuth } from "../utils/google.js";
import { generateFormData } from "../utils/common.js";

export const getEntryIdList = async () => {
	const entryList = await getEntryList();
	const entryIdList = [];

	entryList.forEach((entry, idx) => {
		if (idx !== 0) {
			entryIdList.push(entry[0]);
		}
	});

	return entryIdList;
};

export const getEntryById = async (id, job, municipality) => {
	const entryList = await getEntryList();
	let foundEntry = [];

	entryList.some((entry) => {
		if (entry[GOOGLE_SPREADSHEET_COLUMN_ID_IDX] === id) {
			foundEntry = entry;
		}
	});

	return generateFormData(foundEntry, job, municipality);
};

const getEntryList = async () => {
	const auth = getAuth();
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const metadata = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
		range: process.env.GOOGLE_SPREADSHEET_FORM_RESPONSES_TAB,
	});

	return metadata.data.values;
};
