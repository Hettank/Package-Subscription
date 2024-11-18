import express from "express";
import authRoutes from "./auth.routes.js"
import packageRoutes from './package.routes.js'

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/packages", packageRoutes)

export default router