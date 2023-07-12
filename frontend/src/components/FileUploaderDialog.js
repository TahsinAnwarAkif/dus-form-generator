import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FileUploader } from "react-drag-drop-files";
import { getMsg, getMsgWithParams } from "../utils/utils";
import { makeStyles } from "@mui/styles";
import { uploadFile } from "../actions/fileActions";
import { showErrorAlert, showSuccessAlert } from "../utils/alert";
import { useStore } from "../store/store";

const useStyles = makeStyles({
	dialogButton: {
		backgroundColor: "burlywood !important",
		color: "black !important",
		fontWeight: "600 !important",
	},
	dialogTitle: {
		fontWeight: "600 !important",
	},
	dialogContent: {
		color: "black !important",
		lineHeight: "1.8 !important",
		marginBottom: "10px !important",
	},
});

export const FileUploaderDialog = () => {
	const addForm = useStore((state) => state.addForm);

	const [file, setFile] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason && reason === "backdropClick") {
			return;
		}

		setOpen(false);
	};

	const handleUpload = async (file) => {
		setFile(file);
		const { success } = await uploadFile(file);

		if (success) {
			addForm(file.name);

			showSuccessAlert(getMsgWithParams("form.upload.success", "en", file.name));
		} else {
			showErrorAlert(getMsgWithParams("form.upload.failure", "en", file.name));
		}
	};

	const DDFileUploader = () => {
		return <FileUploader name="file" handleChange={(file) => handleUpload(file)} types={["DOCX", "PDF"]} maxSize={10} />;
	};

	const classes = useStyles();
	const renderFileUploaderDialog = () => {
		return (
			<div style={{ marginRight: 15 }}>
				<Button variant="contained" className={classes.dialogButton} onClick={handleOpen}>
					{getMsg("form.upload.btn")}
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle className={classes.dialogTitle}>{getMsg("form.upload.btn").toUpperCase()}</DialogTitle>
					<DialogContent>
						<DialogContentText className={classes.dialogContent}>{getMsg("form.upload.dialog.content")}</DialogContentText>
						<DDFileUploader />
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" className={classes.dialogButton} onClick={handleClose}>
							{getMsg("form.upload.done.btn")}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	};

	return renderFileUploaderDialog();
};
