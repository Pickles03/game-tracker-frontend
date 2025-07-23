import {useState} from 'react';
import axios from 'axios';

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
        <div style={{padding: '20px', maxWidth: '400px', margin: 'auto'}}>
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister} autoComplete='off'>
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
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <p>
                Already have an account? <button onClick={switchToLogin}>Login here</button>
            </p>
        </div>
    )
}

export default SignUp;