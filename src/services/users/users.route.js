import express from "express";
import { postJoin } from "./users.controllers";

const router = express.Router();

// router.get("/", getJoin);
router.route("/").post(postJoin);

export default router;