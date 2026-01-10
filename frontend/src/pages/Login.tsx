import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Input from '../components/Input';
import { isAxiosError } from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {

            const response = await api.post('/auth/login', { email, password });

            await login(response.data.token);

            navigate('/');
        } catch (err) {
            // Handle Errors
            if (isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'Login failed');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-archival-paper p-4">
            <div className="w-full max-w-md bg-archival-card border border-archival-border shadow-sm p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-mono font-bold text-archival-ink mb-2">CARTON.</h1>
                    <p className="text-archival-muted font-sans text-sm">
                        Identify yourself to access the archives.
                    </p>
                </div>


                {error && (
                    <div className="mb-6 p-3 bg-archival-red/10 border border-archival-red text-archival-red text-sm font-mono text-center">
                        ERROR: {error}
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="researcher@carton.app"
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-archival-accent text-white font-mono uppercase tracking-wider text-sm hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Access System'}
                    </button>
                </form>


                <div className="mt-8 text-center border-t border-archival-border pt-4">
                    <p className="text-xs text-archival-muted font-mono">
                        NEW RESEARCHER?{' '}
                        <Link to="/register" className="text-archival-ink underline hover:text-archival-accent">
                            REQUEST ACCESS
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;