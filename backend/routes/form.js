import express from "express";
import { generateForm, getMetadata } from "../controllers/form.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.use(authenticate);

router.route("/metadata").get(getMetadata);

router.route("/").post(generateForm);

export default router;
