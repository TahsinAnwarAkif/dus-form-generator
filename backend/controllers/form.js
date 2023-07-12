import asyncHandler from "express-async-handler";
import { getFormNameList, prepareDownloadableFormList } from "../services/form.js";
import { getEntryById, getEntryIdList } from "../services/google.js";

// @ desc   Get Metadata Before Generating Form
// @ route  GET /api/v1/dus/form/metadata
// @ access Private
export const getMetadata = asyncHandler(async (req, res, next) => {
	const formNameList = getFormNameList();
	const entryIdList = await getEntryIdList();

	res
		.status(200)
		.json({
			success: true,
			data: {
				formNameList,
				entryIdList,
			},
		})
		.end();
});

// @ desc   Generate Forms
// @ route  POST /api/v1/dus/form
// @ access Private
export const generateForm = asyncHandler(async (req, res) => {
	const entry = await getEntryById(req.body.entryId, req.body.job, req.body.municipality);

	const downloadedFilePathList = await prepareDownloadableFormList(req.body.form, entry);

	res
		.status(200)
		.json({
			success: true,
			data: {
				entry,
				downloadedFilePathList,
			},
		})
		.end();
});
