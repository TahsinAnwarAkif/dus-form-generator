import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { downloadFiles, removeFile, uploadFile } from "../controllers/file.js";
import { upload } from "../utils/file.js";

const router = express.Router();

router.use(authenticate);

router.route("/download").get(downloadFiles);
router.route("/upload").post(upload.single("form"), uploadFile);
router.route("/remove").post(removeFile);

export default router;
