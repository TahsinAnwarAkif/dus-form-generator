import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { getMsg } from "../utils/utils";

const useStyles = makeStyles({
	footerAppBar: {
		background: "linear-gradient(45deg, grey 30%, white 90%)",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		fontSize: 15,
		height: 30,
		position: "absolute !important",
		top: "850px !important",
	},
	footerToolBar: {
		justifyContent: "center",
		bottom: 18,
	},
});

export const Footer = () => {
	const classes = useStyles();

	const renderFooter = () => {
		return (
			<AppBar className={classes.footerAppBar} component="footer">
				<Toolbar className={classes.footerToolBar}>{getMsg("footer.title")}</Toolbar>
			</AppBar>
		);
	};

	return renderFooter();
};
