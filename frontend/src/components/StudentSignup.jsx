import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/studentsignup', {
                fullName,
                username,
                email,
                password
            });

            if (res.status === 201) {
                alert("Signup successful");
                navigate('/login'); // Navigate to login page after signup
            }
        } catch (err) {
            console.error('Signup failed:', err.response.data);
            setError(err.response.data.error); // Display error message
        }
    };

    return (
        <div>
            <h2>Student Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default StudentSignup;
