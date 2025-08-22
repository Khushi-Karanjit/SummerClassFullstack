// routes/user.route.js
import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";
import { checkTocken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/image-uploader.middleware.js";
import { uploadProfilePicture } from "../controller/pofile-picture-controller.js";
import { getUserById } from "../controller/user.controller.js";

const router = Router();

router.get('/users', checkTocken, getAllUsers); // you can remove verifyToken if you want it public

router.patch('/uploadProfilePicture', checkTocken, upload.single('image'), uploadProfilePicture);

router.get("/users/:id", getUserById);

export default router;
