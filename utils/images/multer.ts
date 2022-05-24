import multer from "multer"
import { cloudStorage } from "./cloudinary"
export const multerUploads = multer({ storage: cloudStorage })
