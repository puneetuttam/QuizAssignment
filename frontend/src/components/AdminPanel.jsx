import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddQuestion = () => {
    const { quizId } = useParams();  // Get quizId from URL params
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);  // To track the number of existing questions
    const navigate = useNavigate();

    // Fetch the current number of questions for the quiz
    useEffect(() => {
        const fetchQuestionCount = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/quiz/${quizId}/question-count`);
                setQuestionCount(res.data.count);
            } catch (error) {
                console.error("Error fetching question count:", error);
            }
        };

        fetchQuestionCount();
    }, [quizId]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validate that the correctAnswer is an index of the options
        const correctAnswerIndex = parseInt(correctAnswer, 10);
        if (isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex > 3) {
            setError("Correct answer must be a number between 0 and 3");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/quiz/addquestion', {
                questionText,
                options,
                correctAnswer: correctAnswerIndex, // Send index of the correct answer
                quizId, // Link question to quiz
            });

            if (res.status === 201) {
                setSuccess(true);
                alert("Question added successfully");
                // Clear form
                setQuestionText('');
                setOptions(['', '', '', '']);
                setCorrectAnswer('');
                // Increment question count after adding a question
                setQuestionCount(questionCount + 1);
            }
        } catch (error) {
            console.error("Error adding question:", error);
            setError('Error adding question. Please try again.');
        }
    };

    const handleFinish = () => {
        navigate('/admin');  // Route back to admin panel
    };

    return (
        <div>
            <h2>Add Question to Quiz</h2>
            <p>Current Number of Questions: {questionCount}</p>
            <form onSubmit={handleSubmit}>
                <p><strong>Quiz ID: {quizId}</strong></p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Question added successfully!</p>}
                <input
                    type="text"
                    placeholder="Question Text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                ))}
                <input
                    type="number"
                    placeholder="Correct Answer (0-3)"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                />
                <button type="submit" disabled={questionCount >= 5}>Add Question</button>
            </form>
            {questionCount >= 5 && (
                <div>
                    <p>You have added 5 questions. You can now finish the quiz.</p>
                    <button onClick={handleFinish}>Finish Quiz</button>
                </div>
            )}
        </div>
    );
};

export default AddQuestion;
