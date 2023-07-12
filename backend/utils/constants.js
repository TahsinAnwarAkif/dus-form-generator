export const DOCX_FILE_FORMAT = ".docx";
export const PDF_FILE_FORMAT = ".pdf";

export const GOOGLE_SPREADSHEET_API = "https://www.googleapis.com/auth/spreadsheets";
export const GOOGLE_SPREADSHEET_COLUMN_ID_IDX = 0;
export const GOOGLE_SPREADSHEET_COLUMN_TIMESTAMP_IDX = 1;
export const GOOGLE_SPREADSHEET_COLUMN_CLIENT_EMAIL_IDX = 2;
export const GOOGLE_SPREADSHEET_COLUMN_PROJECT_NAME_IDX = 3;
export const GOOGLE_SPREADSHEET_COLUMN_PROJECT_ADDRESS_IDX = 4;
export const GOOGLE_SPREADSHEET_COLUMN_PROJECT_CITY_STATE_ZIP_IDX = 5;
export const GOOGLE_SPREADSHEET_COLUMN_APN_IDX = 6;
export const GOOGLE_SPREADSHEET_COLUMN_COMPANY_NAME_IDX = 7;
export const GOOGLE_SPREADSHEET_COLUMN_COMPANY_ADDRESS_IDX = 8;
export const GOOGLE_SPREADSHEET_COLUMN_COMPANY_CITY_STATE_ZIP_IDX = 9;
export const GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_NAME_IDX = 10;
export const GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_TITLE_IDX = 11;
export const GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_PHONE_IDX = 12;
export const GOOGLE_SPREADSHEET_COLUMN_SIGNATORY_EMAIL_IDX = 13;
export const GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_IDX = 14;
export const GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_ADDRESS_IDX = 15;
export const GOOGLE_SPREADSHEET_COLUMN_SITE_LLC_STATE_CITY_ZIP_IDX = 16;

export const STAMPABLE_FIELD_LIST = [
	"currentDate",
	"clientEmail",
	"projectName",
	"projectAddress",
	"projectCityStateZip",
	"apn",
	"companyName",
	"companyAddress",
	"companyCityStateZip",
	"signatoryName",
	"signatoryTitle",
	"signatoryPhone",
	"signatoryEmail",
	"siteLLC",
	"siteLLCAddress",
	"siteLLCCityStateZip",
	"job",
	"municipality",
];

export const PUBLIC_URL_LIST = ["/api/v1/dus/file/download"];

export const TRASH_FILES_REMOVER_SCHEDULER_TIME_PATTERN = "0 0 0 * * 0";
