import { toast } from "react-toastify";

export const showSuccessAlert = (msg) => {
	toast.success(msg, {
		position: toast.POSITION.TOP_RIGHT,
		style: {
			color: "black",
			background: "#F8F0E3",
			boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: 1.4,
		},
	});
};

export const showErrorAlert = (msg) => {
	toast.error(msg, {
		position: toast.POSITION.TOP_RIGHT,
		style: {
			color: "black",
			background: "#FAA0A0",
			boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: 1.4,
		},
	});
};
