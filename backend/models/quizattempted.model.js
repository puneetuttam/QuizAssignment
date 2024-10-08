import mongoose from "mongoose";

const quizAttempedSchema = new mongoose.Schema({
    
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    isCorrect: { type: Boolean, required: true },
});

const QuizAttempted = mongoose.model("QuizAttempted", quizAttempedSchema);

export default QuizAttempted;
