import { v2 as cloudinary } from "cloudinary"

import { CloudinaryStorage } from "multer-storage-cloudinary"

import crypto from "crypto"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: (req: any, file: any) =>
            crypto.randomBytes(32).toString("hex"),
    },
})
