import express from "express";
import { createJoin, validJoin } from "./users.controllers";

const router = express.Router();

// router.get("/", getJoin);
router.route("/create").post(createJoin);
router.route("/valid").post(validJoin);

export default router;