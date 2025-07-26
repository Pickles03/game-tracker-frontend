import {useState} from 'react';
import './Login.css';

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
           <>
            <div className='bg'></div>
            <div className='bg bg2'></div>
            <div className='bg bg3'></div>
            <div className='login-wrapper'>
                <h1 className='welcome-title'>Welcome to the game tracker and wishlist creator</h1>
                <h2 className='login-title'>Login</h2>
    
                <form onSubmit={handleSubmit} className='login-form'>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='login-input'
                    />
    
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='login-input'
                    />
    
                    <button type='submit' disabled={loading} className='login-button'>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
    
                {error && <p className='login-error'>{error}</p>}
    
                <p className='login-signup'>
                    Don't have an account?{' '}
                    <button onClick={switchToSignUp} className='login-switch-button'>
                        Sign up here!
                    </button>
                </p>
            </div>
           </>
        )
}

export default Login;