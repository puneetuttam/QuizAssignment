import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const QuizQuestions = () => {
    const location = useLocation(); // Access location to get state
    const { quizId } = location.state; // Get quizId from the state

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // To track the current question
    const [selectedAnswers, setSelectedAnswers] = useState([]); // To track the user's answers
    const [score, setScore] = useState(0); // To track the user's score
    const [isQuizCompleted, setIsQuizCompleted] = useState(false); // To track quiz completion
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                console.log(`Fetching questions for quizId: ${quizId}`); // Debugging log

                // API call to fetch questions for the specific quizId
                const res = await axios.get('http://localhost:5000/api/quiz/allquestion', { quizId });
                console.log('API Response:', res.data); // Debugging log for response
                setQuestions(res.data); // Set the questions in the state
            } catch (err) {
                console.error('Error fetching questions:', err); // Log the error
                setError('Failed to load questions');
            }
        };

        if (quizId) {
            fetchQuestions(); // Fetch questions if quizId is available
        } else {
            console.error('quizId is not available'); // Handle missing quizId
            setError('Invalid quizId');
        }
    }, [quizId]); // Fetch questions when quizId changes

    const handleAnswerSelect = (selectedOption) => {
        // Store the user's selected answer
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setSelectedAnswers(updatedAnswers);

        // Check if the selected answer is correct
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        // Move to the next question or finish the quiz
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizCompleted(true); // Quiz is completed
        }
    };

    if (isQuizCompleted) {
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>Your Score: {score} out of {questions.length}</p>
            </div>
        );
    }

    // Show loading or error messages if there are issues
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // If questions are not yet loaded
    if (questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    // Render the current question
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
            <h3>{currentQuestion.questionText}</h3>
            <ul>
                {currentQuestion.options.map((option, i) => (
                    <li key={i}>
                        <button onClick={() => handleAnswerSelect(i)}>
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizQuestions;
