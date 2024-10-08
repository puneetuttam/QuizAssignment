import express from "express";
import {signup,login, studentlogin, studentsignup } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();


// router.get('/me',protectRoute,getMe)
router.post("/signup", signup );
router.post("/login", login);


router.post("/studentsignup", studentsignup );
router.post("/studentlogin", studentlogin);


// router.post("/logout", logout);

export default router;
