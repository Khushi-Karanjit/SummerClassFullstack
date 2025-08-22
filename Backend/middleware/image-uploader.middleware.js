import multer,{ memoryStorage} from "multer";
import cloudinary from "../config/cloudinary.config.js";
const storage = memoryStorage();
export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"].includes(file.mimetype);
        cb(allowedTypes ? null : new Error("Invalid file type"), allowedTypes);
    }
});


export function uploadBufferToCloudinary(buffer, options ={}) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
             {resource_type: 'image', ...options},
             (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
    });
}
