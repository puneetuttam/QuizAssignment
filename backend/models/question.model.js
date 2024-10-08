import mongoose from "mongoose";

// Define questionSchema first, since it's referenced in addQuizSchema

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of options
    correctAnswer: { type: Number, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },

});

// Create the model
const addQuestion = mongoose.model("AddQuestion", questionSchema);

export default addQuestion;
