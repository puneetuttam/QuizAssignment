import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/quiz/addquiz', {
                title,
                description,
            });

            if (res.status === 201) {
                alert("Quiz added successfully");
                // Navigate to the quiz list page after adding the quiz
                navigate('/quiz-list');
            }
        } catch (error) {
            console.error("Error adding quiz:", error);
        }
    };

    return (
        <div>
            <h2>Add New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Quiz Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default AddQuiz;
