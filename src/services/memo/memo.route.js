import express from "express";
import memoController from "./memo.controller";
import uploadMiddleware from "../../helpers/multer";

const router = express.Router();

router.route("/create").post(uploadMiddleware, memoController.createMemo);
router.route("/getMemoWithUser").post(memoController.getMemo);
router.route("/delete").post(memoController.delete);
router.route("/excel").post(memoController.downloadExcel);


export default router;