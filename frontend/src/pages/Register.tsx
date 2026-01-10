import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Input from '../components/Input';
import { isAxiosError } from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                bio
            });

            await login(response.data.token);

            navigate('/');
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'Registration failed');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-archival-paper p-4">
            <div className="w-full max-w-md bg-archival-card border border-archival-border shadow-sm p-8 my-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-mono font-bold text-archival-ink mb-2">CARTON.</h1>
                    <p className="text-archival-muted font-sans text-sm">
                        Request new researcher credentials.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 bg-archival-red/10 border border-archival-red text-archival-red text-sm font-mono text-center">
                        ERROR: {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. A. Smith"
                        required
                    />

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
                        placeholder="Min. 6 characters"
                        required
                    />

                    {/* Bio Input (Text Area style) */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-archival-muted">
                            Field Biography (Optional)
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={2}
                            className="w-full bg-archival-paper border-b-2 border-archival-border px-0 py-2 font-sans text-archival-ink placeholder:text-archival-muted/50 focus:outline-none focus:border-archival-accent transition-colors resize-none"
                            placeholder="Brief research focus..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-archival-accent text-white font-mono uppercase tracking-wider text-sm hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer mt-4"
                    >
                        {isSubmitting ? 'Processing...' : 'Initialize Record'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center border-t border-archival-border pt-4">
                    <p className="text-xs text-archival-muted font-mono">
                        ALREADY REGISTERED?{' '}
                        <Link to="/login" className="text-archival-ink underline hover:text-archival-accent">
                            ACCESS LOGIN
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;