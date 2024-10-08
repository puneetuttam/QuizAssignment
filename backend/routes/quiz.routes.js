import express from "express";
const router = express.Router();
import { Question, Quiz,AllQuiz ,AllQuestion,AttemptedQuiz} from "../controllers/quiz.controller.js";


router.post("/addquiz",Quiz)
router.post("/addquestion",Question)
router.get("/allquestion",AllQuestion)
router.get("/allquiz",AllQuiz)

router.post("/attemptedquiz",AttemptedQuiz)

export default router;