import { Router } from "express";
import { getALLSubmittedCode, registerCode } from "../controllers/codeSubmit.control.js";

const submittedCodeRouter = Router();

submittedCodeRouter.route("/code").get((req, res) => getALLSubmittedCode(req, res)).post((req, res) => registerCode(req, res));
export default submittedCodeRouter;
