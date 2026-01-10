import { useState, useEffect } from 'react';
import api from '../api/client';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { Save } from 'lucide-react';

const AVATARS = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4'];

const Profile = () => {
    const { user, login } = useAuth();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Load existing data when page opens
    useEffect(() => {
        if (user) {
            setName(user.name);
            setBio(user.bio || '');
            setSelectedAvatar(user.avatar || 'avatar-1');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMsg('');

        try {
            // 1. Send update to backend
            await api.put('/users/me', {
                name,
                bio,
                avatar: selectedAvatar
            });


            const token = localStorage.getItem('token');
            if (token) await login(token);

            setSuccessMsg('PERSONNEL RECORD UPDATED SUCCESSFULLY.');
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl">
                <div className="mb-8 border-b border-archival-border pb-6">
                    <h2 className="text-3xl font-mono font-bold text-archival-ink">PERSONNEL RECORD</h2>
                    <p className="text-archival-muted font-sans mt-1">
                        Update your researcher credentials and identification stamps.
                    </p>
                </div>

                {successMsg && (
                    <div className="mb-6 p-4 bg-archival-accent/10 border border-archival-accent text-archival-accent font-mono text-sm">
                        STATUS: {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-archival-card p-8 border border-archival-border shadow-sm">

                    {/* Avatar Selection */}
                    <div>
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-archival-muted block mb-3">
                            Identification Stamp
                        </label>
                        <div className="flex gap-4">
                            {AVATARS.map((av) => (
                                <button
                                    key={av}
                                    type="button"
                                    onClick={() => setSelectedAvatar(av)}
                                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${selectedAvatar === av
                                        ? 'border-archival-accent bg-archival-paper ring-2 ring-archival-accent/20'
                                        : 'border-archival-border bg-archival-paper hover:border-archival-muted'
                                        }`}
                                >
                                    {/* Placeholder for real images - using Text for now */}
                                    <span className="font-mono text-xs text-archival-ink">{av.split('-')[1]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <Input
                            label="Researcher Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Bio Text Area */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-archival-muted">
                                Field Biography
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className="w-full bg-archival-paper border-b-2 border-archival-border px-0 py-2 font-sans text-archival-ink focus:outline-none focus:border-archival-accent resize-none"
                                placeholder="Brief description of research focus..."
                            />
                            <p className="text-xs text-archival-muted text-right">
                                {bio.length}/160 characters
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-archival-border flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-archival-accent text-white px-6 py-3 font-mono text-sm flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            <Save size={16} />
                            <span>UPDATE RECORD</span>
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Profile;