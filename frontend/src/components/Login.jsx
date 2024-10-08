import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Make sure you're pointing to the correct backend URL (port 5000)
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            console.log(username)
            console.log(password)

            // If login is successful, redirect to the admin panel
            if (res.data) {
                navigate('/admin');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
