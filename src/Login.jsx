import {useState} from 'react';

import axios from 'axios';

function Login({onLogin, switchToSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password,
            });

            const token = response.data.token;
            const userEmail = response.data.user.email;

            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', userEmail);
            onLogin();
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message || 'Login failed';

                if (message === 'Invalid credentials') {
                    setError('No user found. Please sign up.');
                } else if (message === 'Invalid password') {
                    setError('Incorrect password. Please try again.');
                } else {
                    setError(message);
                }
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        } 
    };

    return (
        <div style={{padding: '20px', maxWidth: '400px', margin: 'auto'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br /> <br />

                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br /> <br />

                <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <p>
                Don't have an account? <button onClick={switchToSignUp}>Sing up here!</button>
            </p>
        </div>
    )
}

export default Login;