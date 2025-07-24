import { useState } from 'react';

export function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onRegister(username.trim());
            setUsername('');
        } else {
            setError('Please enter a valid username');
        }
    };
    
    const handleChange = (e) => {
        setUsername(e.target.value);
        if (error) setError('');
    };

    return (
        <form className="register-form neon-card" onSubmit={handleSubmit}>
            <h2>Register to Play</h2>
            <input
            type="text"
            name="username"
            className="neon-input"
            placeholder="Enter your name"
            value={username}
            onChange={handleChange}
            required
            />
            {error && <div className="error-message">{error}</div>}
            <button
            type="submit" 
            className="quiz-btn start-btn" 
            style={{ marginTop: '18px' }}
            >
                Register
            </button>
        </form>
    );
}