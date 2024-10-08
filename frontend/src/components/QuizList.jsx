import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of quizzes from the API
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/quiz/allquiz');
                setQuizzes(res.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    // Navigate to add question page for a specific quiz
    const handleAddQuestion = (quizId) => {
        navigate(`/add-question/${quizId}`);
    };

    return (
        <div>
            <h2>Quiz List</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <button onClick={() => handleAddQuestion(quiz._id)}>Add Question</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
