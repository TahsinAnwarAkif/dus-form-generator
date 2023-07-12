import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getMsg, getMsgWithParams, isNotEmpty } from "../utils/utils";
import { makeStyles } from "@mui/styles";
import { showErrorAlert, showSuccessAlert } from "../utils/alert";
import { useStore } from "../store/store";
import { Autocomplete, TextField } from "@mui/material";
import { removeFile } from "../actions/fileActions";

const useStyles = makeStyles({
	dialogOpenButton: {
		backgroundColor: "#F88379 !important",
		color: "black !important",
		fontWeight: "600 !important",
	},
	dialogCloseButton: {
		backgroundColor: "burlywood !important",
		color: "black !important",
		fontWeight: "600 !important",

		"&:disabled": {
			backgroundColor: "unset",
			opacity: 0.4,
		},
	},
	dialogTitle: {
		fontWeight: "600 !important",
	},
	dialogContent: {
		color: "black !important",
		lineHeight: "1.8 !important",
		marginBottom: "10px !important",
	},
	textField: {
		marginTop: "5px !important",
		marginBottom: "10px !important",
		width: 500,
	},
});

export const FileRemoverDialog = ({ onSuccess }) => {
	const formList = useStore((state) => state.formList);
	const removeForm = useStore((state) => state.removeForm);

	const [form, setForm] = useState("");

	const [open, setOpen] = useState(false);
	const [submitEnabled, setSubmitEnabled] = useState(false);

	useEffect(() => {
		setSubmitEnabled(isNotEmpty(form) && formList.length > 1);
	}, [form, formList]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleRemove = async (e) => {
		e.preventDefault();

		const { success } = await removeFile(form);

		if (success) {
			removeForm(form);
			onSuccess();

			showSuccessAlert(getMsgWithParams("form.remove.success", "en", form));
		} else {
			showErrorAlert(getMsg("form.remove.failure"));
		}

		handleClose();
	};

	const handleClose = (e, reason) => {
		if (reason && reason === "backdropClick") {
			return;
		}

		clearInputs();
		setOpen(false);
	};

	const clearInputs = () => {
		setForm("");
	};

	const classes = useStyles();
	const renderFileRemoverDialog = () => {
		return (
			<div>
				<Button variant="contained" className={classes.dialogOpenButton} onClick={handleOpen}>
					{getMsg("form.remove.btn")}
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle className={classes.dialogTitle}>{getMsg("form.remove.btn").toUpperCase()}</DialogTitle>
					<DialogContent>
						<Autocomplete
							id="formToBeRemoved"
							options={formList}
							renderInput={(params) => <TextField {...params} label={getMsg("select.form.field")} />}
							className={classes.textField}
							value={form}
							onChange={(event, inputValue) => {
								setForm(inputValue);
							}}
							isOptionEqualToValue={(option) => formList.includes(option)}
							disableClearable
							multiple={false}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" className={classes.dialogCloseButton} onClick={handleClose}>
							{getMsg("cancel.btn")}
						</Button>
						<Button variant="outlined" className={classes.dialogCloseButton} onClick={handleRemove} disabled={!submitEnabled}>
							{getMsg("form.remove.confirm.btn")}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	};

	return renderFileRemoverDialog();
};
