import { useState } from 'react';

export function ResultsPage() {
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
        <>
        </>
    )
}