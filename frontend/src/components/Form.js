import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { getDownloadableFileName, getFileDownloadUrl, getMsg, isNotEmpty } from "../utils/utils";
import { Autocomplete, CircularProgress } from "@mui/material";
import { Button, TextField, Grid } from "@mui/material";
import { generateForm, getFormMetadata } from "../actions/formActions";
import { FileUploaderDialog } from "./FileUploaderDialog";
import { showSuccessAlert } from "../utils/alert";
import { useStore } from "../store/store";
import { FileRemoverDialog } from "./FileRemoverDialog";

const useStyles = makeStyles({
	fileDialog: {
		position: "absolute !important",
		top: 200,
		display: "flex",
	},
	form: {
		position: "absolute !important",
		top: 280,
		display: "inline-grid",
	},
	textField: {
		marginBottom: "18px !important",
		width: 600,
	},
	submitButton: {
		width: 100,
		left: 250,
	},
	loadingSpinner: {
		position: "absolute !important",
		top: 380,
		marginLeft: -50,
	},
});

export const Form = () => {
	const formList = useStore((state) => state.formList);
	const entryIdList = useStore((state) => state.entryIdList);
	const addForm = useStore((state) => state.addForm);
	const addEntryId = useStore((state) => state.addEntryId);
	const resetFormList = useStore((state) => state.resetFormList);
	const resetEntryIdList = useStore((state) => state.resetEntryIdList);

	const [form, setForm] = useState([]);
	const [entryId, setEntryId] = useState("");
	const [job, setJob] = useState("");
	const [municipality, setMunicipality] = useState("");
	const [submitEnabled, setSubmitEnabled] = useState(false);

	const [downloadableFilePathList, setDownloadableFilePathList] = useState([]);
	const [triggerDownload, setTriggerDownload] = useState(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		resetFormList();
		resetEntryIdList();

		getFormMetadata().then((metadata) => {
			if (metadata?.data?.formNameList?.length !== 0) {
				metadata.data.formNameList.forEach((formName) => addForm(formName));
			}

			if (metadata?.data?.entryIdList?.length !== 0) {
				metadata.data.entryIdList.forEach((entryId) => addEntryId(entryId));
			}

			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (triggerDownload) {
			var tmpDownloadLink = document.createElement("a");
			tmpDownloadLink.style.display = "none";
			document.body.appendChild(tmpDownloadLink);

			for (const filePath of downloadableFilePathList) {
				getFileDownloadUrl(filePath).then((fileDownloadUrl) => {
					tmpDownloadLink.setAttribute("href", fileDownloadUrl);
					tmpDownloadLink.setAttribute("download", getDownloadableFileName(fileDownloadUrl));
					tmpDownloadLink.setAttribute("target", "_blank");
					tmpDownloadLink.click();
				});
			}

			setTriggerDownload(false);
			setDownloadableFilePathList([]);
			tmpDownloadLink.remove();
		}
	}, [triggerDownload, downloadableFilePathList]);

	useEffect(() => {
		setSubmitEnabled(form.length !== 0 && isNotEmpty(entryId) && isNotEmpty(job) && isNotEmpty(municipality));
	}, [form, entryId, job, municipality]);

	const submitHandler = async (e) => {
		e.preventDefault();
		setSubmitEnabled(false);

		const { data } = await generateForm(form, entryId, job, municipality);

		if (data && data.downloadedFilePathList.length !== 0) {
			setDownloadableFilePathList(data.downloadedFilePathList);
			setTriggerDownload(true);
		}

		showSuccessAlert(getMsg("form.download.success"));

		clearInputs();
	};

	const clearInputs = () => {
		setForm([]);
		setEntryId("");
		setJob("");
		setMunicipality("");
	};

	const classes = useStyles();
	const renderForm = () => {
		if (loading) {
			return (
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<div className={classes.loadingSpinner}>
						<CircularProgress />
					</div>
				</Grid>
			);
		} else {
			return (
				<>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<div className={classes.fileDialog}>
							<FileUploaderDialog />
							<FileRemoverDialog onSuccess={() => setForm([])} />
						</div>
					</Grid>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<form className={classes.form}>
							<Autocomplete
								id="form"
								options={formList}
								renderInput={(params) => <TextField {...params} label={getMsg("select.form.field")} />}
								className={classes.textField}
								limitTags={2}
								value={form}
								onChange={(event, inputValue) => {
									setForm(inputValue);
								}}
								disablePortal
								disableClearable
								multiple
							/>
							<Autocomplete
								id="entryId"
								options={entryIdList}
								renderInput={(params) => <TextField {...params} label={getMsg("select.entry.id.field")} />}
								className={classes.textField}
								value={entryId}
								onChange={(e) => {
									setEntryId(e.target.textContent);
								}}
								isOptionEqualToValue={(option) => entryIdList.includes(option)}
								disablePortal
								disableClearable
							/>
							<TextField
								id="dusJob"
								label={getMsg("dus.job.field")}
								value={job}
								onChange={(e) => {
									setJob(e.target.value);
								}}
								variant="outlined"
								className={classes.textField}
							/>
							<TextField
								id="municipality"
								label={getMsg("municipality.field")}
								value={municipality}
								onChange={(e) => {
									setMunicipality(e.target.value);
								}}
								variant="outlined"
								className={classes.textField}
							/>
							<Button onClick={(e) => submitHandler(e)} variant="contained" color="primary" className={classes.submitButton} disabled={!submitEnabled}>
								{getMsg("form.generate.btn")}
							</Button>
						</form>
					</Grid>
				</>
			);
		}
	};

	return renderForm();
};
