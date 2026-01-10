import { useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import api from '../api/client';
import Input from './Input';

interface CreateNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; 
}

const CreateNoteModal = ({ isOpen, onClose, onSuccess }: CreateNoteModalProps) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post('/notes', { title, category, content });
            
            setTitle('');
            setCategory('');
            setContent('');
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create note", error);
            alert("Failed to save entry."); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Backdrop (Darkened glass)
        <div className="fixed inset-0 bg-archival-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            {/* The Card */}
            <div className="bg-archival-paper w-full max-w-lg border-2 border-archival-ink shadow-2xl relative flex flex-col max-h-[90vh]">

                {/* Header (Looks like a file folder tab) */}
                <div className="bg-archival-ink text-archival-paper p-4 flex justify-between items-center">
                    <h2 className="font-mono font-bold tracking-wider">NEW_ENTRY.LOG</h2>
                    <button onClick={onClose} className="hover:text-archival-accent transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">

                    <Input
                        label="Entry Title"
                        placeholder="Subject of observation..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                    />

                    <Input
                        label="Category Tag"
                        placeholder="e.g. Work, Field Notes, Ideas"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    {/* Text Area (Custom styled to look like lined paper) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-archival-muted">
                            Observation Log
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={8}
                            className="w-full bg-archival-paper border border-archival-border p-4 font-sans text-archival-ink focus:outline-none focus:border-archival-accent resize-none leading-relaxed"
                            placeholder="Begin typing..."
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 font-mono text-sm text-archival-muted hover:text-archival-ink transition-colors cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-archival-accent text-white font-mono text-sm hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            {isSubmitting ? 'SAVING...' : 'CONFIRM ENTRY'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNoteModal;