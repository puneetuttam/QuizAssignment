import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate to navigate to the questions page

    useEffect(() => {
        // Fetch all quizzes when the component is mounted
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/quiz/allquiz');
                setQuizzes(res.data); // Set the quizzes in the state
            } catch (err) {
                console.error('Error fetching quizzes:', err);
                setError('Failed to load quizzes');
            }
        };

        fetchQuizzes();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const handleAttemptQuiz = (quizId) => {
        // Navigate to the QuizQuestions component with the quizId passed in state
        navigate('/quiz/questions', { state: { quizId } });
    };

    return (
        <div>
            <h2>All Available Quizzes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        {/* Update button to navigate to the QuizQuestions page */}
                        <button onClick={() => handleAttemptQuiz(quiz._id)}>
                            Attempt Quiz
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
