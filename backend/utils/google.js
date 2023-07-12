import { GOOGLE_SPREADSHEET_API } from "./constants.js";
import { google } from "googleapis";

export const getAuth = () => {
	return new google.auth.GoogleAuth({
		keyFile: process.env.GOOGLE_SPREADSHEET_CREDS,
		scopes: GOOGLE_SPREADSHEET_API,
	});
};
