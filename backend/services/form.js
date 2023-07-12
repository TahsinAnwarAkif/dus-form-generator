import fs from "fs";
import { PDF_FILE_FORMAT, DOCX_FILE_FORMAT } from "../utils/constants.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { PDFDocument } from "pdf-lib";
import { getDownloadDocxFilePath, stampDocxData } from "../utils/docx.js";
import { getDownloadPdfFilePath, stampPdfData } from "../utils/pdf.js";
import { getFileListByDirectory } from "../utils/file.js";

export const getFormNameList = () => {
	return getFileListByDirectory(process.env.FORM_UPLOADS_PATH);
};

export const prepareDownloadableFormList = async (forms, entry) => {
	const filePathList = [];

	if (forms.length !== 0) {
		for (const form of forms) {
			const isPDF = form.indexOf(PDF_FILE_FORMAT) !== -1 && form.endsWith(PDF_FILE_FORMAT);
			const isWord = form.indexOf(DOCX_FILE_FORMAT) !== -1 && form.endsWith(DOCX_FILE_FORMAT);

			const filePath = isPDF ? await preparePDFForm(form, entry) : isWord ? prepareDocxForm(form, entry) : undefined;
			filePath && filePathList.push(filePath);
		}
	}

	return filePathList;
};

const preparePDFForm = async (form, entry) => {
	let pdf = await PDFDocument.load(fs.readFileSync(`${process.env.FORM_UPLOADS_PATH}/${form}`));

	pdf = stampPdfData(pdf, entry);

	const buffer = await pdf.save();
	const filePath = getDownloadPdfFilePath(form);
	fs.writeFileSync(filePath, buffer);

	return filePath;
};

const prepareDocxForm = (form, entry) => {
	const content = fs.readFileSync(`${process.env.FORM_UPLOADS_PATH}/${form}`, "binary");
	const pizzip = new PizZip(content);
	let docx = new Docxtemplater(pizzip);

	docx = stampDocxData(docx, entry);
	docx.render();

	const buffer = docx.getZip().generate({ type: "nodebuffer" });
	const filePath = getDownloadDocxFilePath(form);
	fs.writeFileSync(filePath, buffer);

	return filePath;
};
