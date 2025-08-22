import User from "../models/user.model.js";
import { uploadBufferToCloudinary } from "../middleware/image-uploader.middleware.js";

export async function uploadProfilePicture(req, res) {
    try {
     if (!req.file ) throw new Error("No file uploaded");

     const result = await uploadBufferToCloudinary(req.file.buffer, {
        folder: "profile_pictures",
        public_id: `profile_pictures/${req.user.id}`,
        transformation: [
            { width: 1600, height: 1600, crop: "fill", gravity: "auto" },
            { quality: "auto", fetch_format: "auto" },
        ]
     });

     const user = await User.findByIdAndUpdate(

        req.user.id,
        {
            profilePicture: {
                url: result.secure_url,
                public_id: result.public_id
            }
            },
            {new: true}

        );
        res.json({success: true, image: user.profilePicture})



    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}
