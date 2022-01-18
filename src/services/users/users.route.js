import express from "express";
import { createJoin, validJoin, loginUser } from "./users.controllers";

const router = express.Router();

// router.get("/", getJoin);
router.route("/join/create").post(createJoin);
router.route("/join/valid").post(validJoin);
router.route("/login").post(loginUser);

export default router;