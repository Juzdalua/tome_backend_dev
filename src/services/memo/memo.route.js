import express from "express";
import memoController from "./memo.controller";
import uploadMiddleware from "../../helpers/multer";

const router = express.Router();

router.route("/create").post(uploadMiddleware, memoController.createMemo);
router.route("/getMemoWithUser").post(memoController.getMemo);


export default router;