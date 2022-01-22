import express from "express";
import memoController from "./memo.controller";

const router = express.Router();

router.route("/create").post(memoController.createMemo);
router.route("/getMemoWithUser").post(memoController.getMemo);


export default router;