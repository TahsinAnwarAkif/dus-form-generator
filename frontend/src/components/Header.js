import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { getMsg } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
	headerAppBar: {
		background: "linear-gradient(45deg, grey 30%, white 90%)",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		fontSize: 30,
	},
	headerToolBar: {
		justifyContent: "center",
	},
});

export const Header = () => {
	const classes = useStyles();

	const renderHeader = () => {
		return (
			<>
				<AppBar className={classes.headerAppBar} component="header">
					<Toolbar className={classes.headerToolBar}>{getMsg("header.title")}</Toolbar>
				</AppBar>
				<ToastContainer newestOnTop={true} autoClose={3000} />
			</>
		);
	};

	return renderHeader();
};
