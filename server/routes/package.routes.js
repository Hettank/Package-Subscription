import express from "express"
import packageController from "../controller/package.controller.js"
import protectRoute from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", packageController.getPackages)
router.get("/package-by-user/:userId", packageController.fetchPackageByUser)
router.post("/", protectRoute, packageController.createPackage)
router.post("/buy-package", protectRoute, packageController.buyPackage)
router.put("/update-package/:packageId", protectRoute, packageController.updatePackage)
router.delete("/delete-package/:packageId", protectRoute, packageController.deletePackage)

export default router