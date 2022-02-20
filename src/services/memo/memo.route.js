import express from "express";
import memoController from "./memo.controller";
import uploadMiddleware from "../../helpers/multer";
import { verifyJWT, userAurhorize } from "../../helpers/jwt";

const router = express.Router();

router.route("/create").post(uploadMiddleware, memoController.createMemo);
router.route("/getMemoWithUser").get(userAurhorize, memoController.getMemo);
router.route("/delete").post(memoController.delete);
router.route("/excel").get(memoController.downloadExcel);


export default router;