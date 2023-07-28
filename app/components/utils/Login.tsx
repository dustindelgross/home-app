'use client'
import { useContext, useState, useEffect } from 'react';
import AuthContext from './authContext';

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isRegister) {
            if (password !== passwordConfirm) {
                setError('Passwords do not match');
                return;
            }
            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    // Login successful
                    const data = await response.json();
                    // Assuming the server responds with additional user data like username, id, etc.
                    localStorage.setItem('oh-user', JSON.stringify(data));
                    setUser(data);

                } else {
                    // Login failed
                    const errorData = await response.json();
                    setError(errorData.error || 'Invalid credentials');
                }
            }
            catch (error) {
                setError('Something went wrong during login.');
            }
        }

        try {
            const response = await fetch('/api/users/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful
                const data = await response.json();
                // Assuming the server responds with additional user data like username, id, etc.
                localStorage.setItem('oh-user', JSON.stringify(data));
                setUser(data);

            } else {
                // Login failed
                const errorData = await response.json();
                setError(errorData.error || 'Invalid credentials');
            }
        } catch (error) {
            setError('Something went wrong during login.');
        }
    };



    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>

            <form
                className='flex flex-col justify-center items-center gap-2'
                onSubmit={handleLogin}>
                <input
                    className='bg-grey-800 p-1 rounded active:border-blue-400 focus:border-blue-400'
                    type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input
                    className='bg-grey-800 p-1 rounded active:border-blue-400 focus:border-blue-400'
                    type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {isRegister &&
                    <input
                        className='bg-grey-800 p-1 rounded active:border-blue-400 focus:border-blue-400'
                        type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                }
                <div className="flex flex-row nowrap gap-2">
                    {!isRegister &&
                        <>
                            <button
                                className='bg-blue-600 px-5 py-1 rounded'
                                type="submit">Log In</button>
                            <button
                                className='bg-blue-600 px-5 py-1 rounded'
                                type="button"
                                onClick={() => {
                                    setIsRegister(true)
                                }}>Register</button>
                        </>
                    }
                    {isRegister &&
                        <>
                            <button
                                className='bg-blue-600 px-5 py-1 rounded'
                                type="submit">Register</button>
                            <button
                                className='bg-blue-600 px-5 py-1 rounded'
                                type="button"
                                onClick={() => {
                                    setIsRegister(false)
                                }}>Back</button>
                        </>
                    }
                </div>
            </form>
            {error && <div className="text-red-500 mt-3">{error}</div>}
        </div>
    );
};

export default Login;
