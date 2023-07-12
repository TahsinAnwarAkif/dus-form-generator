import { getCurrentDate } from "./common.js";
import { PDF_FILE_FORMAT, STAMPABLE_FIELD_LIST } from "./constants.js";
import { isNotEmpty } from "./string.js";

export const stampPdfData = (pdf, entry) => {
	let idx = 0;

	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], getCurrentDate());
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.clientEmail);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.projectName);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.projectAddress);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.projectCityStateZip);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.apn);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.companyName);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.companyAddress);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.companyCityStateZip);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.signatoryName);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.signatoryTitle);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.signatoryPhone);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.signatoryEmail);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.siteLLC);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.siteLLCAddress);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.siteLLCCityStateZip);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.job);
	pdf = stampPdfTextField(pdf, STAMPABLE_FIELD_LIST[idx++], entry.municipality);

	return pdf;
};

const stampPdfTextField = (pdf, fieldName, fieldValue) => {
	try {
		const pdfForm = pdf.getForm();
		const field = pdfForm.getTextField(fieldName);

		if (isNotEmpty(fieldValue)) {
			field.setText(fieldValue);
		}

		return pdf;
	} catch (e) {
		console.log(`Skipping ${fieldName} since it's not present`);

		return pdf;
	}
};

export const getDownloadPdfFilePath = (fileName) => {
	return `${process.env.FORM_DOWNLOADS_PATH}/${fileName.split(PDF_FILE_FORMAT)[0]}-${new Date().getTime()}${PDF_FILE_FORMAT}`;
};
