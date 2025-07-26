import {useState} from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp({switchToLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                email, 
                password,
            });

            alert('Registration successful! You can now log in.');
            switchToLogin();
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
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
        <div className='signup-wrapper'>
            <h1 className='welcome-title'>Welcome to the game tracker and wishlist creator</h1>
            <h2 className='signup-title'>Sign Up</h2>
            <form onSubmit={handleRegister} autoComplete='off' className='signup-form'>
                <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='signup-input'
                />

                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='signup-input'
                />

                <button type='submit' disabled={loading} className='signup-button'>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
            {error && <p className='signup-error'>{error}</p>}
            <p className='signup-login'>
                Already have an account? <button onClick={switchToLogin} className='switch-to-login'>Login here</button>
            </p>
        </div>
        </>
    )
}

export default SignUp;