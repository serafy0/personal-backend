import { multerUploads } from "./../../utils/images/multer"
import { Router } from "express"
import { addProject } from "./projects.controller"
const router = Router()

router.route("/").post(multerUploads.single("image"), addProject)

export default router
