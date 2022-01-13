import express from "express";
import { getJoin } from "./root.controllers";

const router = express.Router();

// router.get("/", getJoin);
router.route("/").get(getJoin);

export default router;