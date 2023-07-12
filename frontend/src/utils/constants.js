export const messages = {
	en: {
		"header.title": "DUS PDF Generator",
		"footer.title": "© 2023 DUS, All Rights Reserved.",
		"select.form.field": "Select Form",
		"select.entry.id.field": "Select Entry ID (from Google Sheets)",
		"dus.job.field": "DUS Job #",
		"municipality.field": "Municipality",
		"form.generate.btn": "Generate",
		"form.download.success": "Filled form(s) are downloaded successfully",
		"form.upload.btn": "Upload a Form Template",
		"form.upload.dialog.content":
			"Please select a file from your local storage to upload. After it is successfully uploaded, it will appear in the 'Select Form' section of the form, with the same name while uploading.",
		"form.upload.done.btn": "Done",
		"form.upload.success": "Form Template {0} is uploaded successfully, it will appear in the 'Select Form' dropdown",
		"form.upload.failure": "Please add a valid new docx/pdf form template with maximum size of 10 MB. Also, {0} may be already present in the 'Select Form' dropdown",
		"form.remove.btn": "Remove a Form Template",
		"cancel.btn": "Cancel",
		"form.remove.confirm.btn": "Confirm",
		"form.remove.success": "Form Template {0} is removed successfully",
		"form.remove.failure": "Please provide a valid name of an existing form template and keep at least one form template",
	},
};

export const GET_FORM_METADATA_URL = "/api/v1/dus/form/metadata";
export const POST_FORM_GENERATION_URL = "/api/v1/dus/form";
export const GET_FILE_DOWNLOAD_URL = `/api/v1/dus/file/download`;
export const POST_FILE_UPLOAD_URL = `/api/v1/dus/file/upload`;
export const POST_FILE_REMOVE_URL = `/api/v1/dus/file/remove`;
