import express from "express";
import handleSendEmail from "../../controllers/emailsenderController.js";

const router = express.Router();
router.route("/").post(handleSendEmail);

export default router;
