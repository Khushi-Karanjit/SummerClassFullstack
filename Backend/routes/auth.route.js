import { Router } from "express";
import multer from "multer";
import { login, register } from "../controller/auth.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post('/register', upload.single("profilePicture"), register);
router.post('/login', login);

export default router;