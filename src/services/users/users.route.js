import express from "express";
import { userAurhorize } from "../../helpers/jwt";
import userController from "./users.controllers";

const router = express.Router();

// router.get("/", getJoin);
router.route("/join/create").post(userController.createJoin);
router.route("/join/valid").post(userController.validJoin);
router.route("/login").post(userController.loginUser);
router.route("/login/kakao").post(userController.loginUserKakao);
router.route("/logout/kakao").post(userController.logoutUserKakao);
router.route("/changePassword").post(userAurhorize ,userController.changePassword);


export default router;