import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import cron from "node-cron";
import formRoutes from "./routes/form.js";
import fileRoutes from "./routes/file.js";
import { notFound, errorHandler } from "./middlewares/error.js";
import { removeTrashFiles } from "./services/file.js";
import { TRASH_FILES_REMOVER_SCHEDULER_TIME_PATTERN } from "./utils/constants.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
});
app.use(limiter);

app.use("/api/v1/dus/form", formRoutes);
app.use("/api/v1/dus/file", fileRoutes);

app.use(process.env.FORM_UPLOADS_PATH, express.static(path.join(__dirname, process.env.FORM_UPLOADS_PATH)));
app.use(process.env.FORM_DOWNLOADS_PATH, express.static(path.join(__dirname, process.env.FORM_DOWNLOADS_PATH)));
app.use(notFound);
app.use(errorHandler);

cron.schedule(TRASH_FILES_REMOVER_SCHEDULER_TIME_PATTERN, () => {
	console.log("Trash File Remover Scheduler has started.");
	removeTrashFiles();
	console.log("Trash File Remover Scheduler has stopped.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline));
