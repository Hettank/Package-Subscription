import express from "express";
import authController from "../controller/auth.controller.js";

const router = express.Router()

router.get("/", authController.getUsers)
router.get("/user-by-packageid/:packageId", authController.userByPackageId)
router.post("/register", authController.register)
router.post("/login", authController.login)

export default router