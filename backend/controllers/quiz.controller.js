import AddQuiz from "../models/quiz.model.js"; // Import AddQuiz model
import addQuestion from "../models/question.model.js";
import QuizAttempted from "../models/quizattempted.model.js";
export const Quiz = async (req, res) => {
    try {
        const { title, description } = req.body; // Expect questions array in the request

        // Create a new quiz with title, description, and questions
        const newQuiz = new AddQuiz({
            title,
            description,
            // questions  // Pass questions from the request
        });

        // Save the quiz
        if (newQuiz) {
            await newQuiz.save();

            res.status(201).json({
                _id: newQuiz._id,
                title: newQuiz.title,
                description: newQuiz.description,
                // questions: newQuiz.questions  // Return the created quiz with its questions
            });
        } else {
            res.status(400).json({ error: "Invalid quiz data" });
        }
    } catch (error) {
        console.error("Error in addQuiz controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const Question = async (req, res) => {
    const { questionText, options, correctAnswer, quizId } = req.body;

    if (
        !questionText ||
        !options ||
        options.length !== 4 ||
        !correctAnswer ||
        !quizId
    ) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const newQuestion = new addQuestion({
            questionText,
            options,
            correctAnswer,
            quizId,
        });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error in addQuiz controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const AllQuestion = async (req, res) => {
    try {
        const { quizId } = req.body;
        console.log("sldflskjf",quizId)
        const questions = await addQuestion.find({  }).populate(); // Fetch only questions for the specified quizId
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error in addQuiz controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const AllQuiz = async (req, res) => {
    try {
        const quiz = await AddQuiz.find();
        res.status(200).json(quiz);
    } catch (error) {
        console.error("Error in AllQuiz controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const AttemptedQuiz=async (req,res)=>{

    const {studentId,quizId,questionId,isCorrect}=req.body;
    console.log(studentId)
    console.log(quizId)
    console.log(questionId)
    console.log(isCorrect)
    const newQuizAttempted = new QuizAttempted({
        studentId,
        quizId,
        questionId,
        isCorrect,
    });
    await newQuizAttempted.save();
    res.status(201).json(newQuizAttempted);

}
