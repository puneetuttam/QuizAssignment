import mongoose from "mongoose";

// Define questionSchema first, since it's referenced in addQuizSchema

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of options
    correctAnswer: { type: String, required: true },
});

// Now define the quiz schema with embedded questions
const addQuizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create the model
const AddQuiz = mongoose.model("AddQuiz", addQuizSchema);

export default AddQuiz;
