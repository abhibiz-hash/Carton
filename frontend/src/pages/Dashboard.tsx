import { useEffect, useState } from 'react';
import api from '../api/client';
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch notes on load
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/notes');
                setNotes(response.data);
            } catch (error) {
                console.error("Failed to fetch notes", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <Layout>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-mono font-bold text-archival-ink">JOURNAL ENTRIES</h2>
                    <p className="text-archival-muted font-sans mt-1">
                        {notes.length} records found in archive.
                    </p>
                </div>

                <button className="bg-archival-accent text-white px-4 py-2 font-mono text-sm flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                    <Plus size={16} />
                    <span>NEW ENTRY</span>
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-20 font-mono text-archival-muted animate-pulse">
                    RETRIEVING RECORDS...
                </div>
            )}

            {/* Empty State */}
            {!isLoading && notes.length === 0 && (
                <div className="border-2 border-dashed border-archival-border p-12 text-center rounded-sm">
                    <p className="font-mono text-archival-muted mb-4">NO ENTRIES RECORDED</p>
                    <p className="font-sans text-sm text-archival-ink max-w-xs mx-auto">
                        Your journal is currently empty. Initialize a new entry to begin your log.
                    </p>
                </div>
            )}

            {/* Notes Grid */}
            <div className="grid gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-archival-card p-6 border border-archival-border hover:border-archival-accent transition-colors group cursor-pointer relative"
                    >
                        {/* Decorative "Tape" or Badge */}
                        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase bg-archival-paper px-2 py-1 border border-archival-border text-archival-muted">
                            {note.category}
                        </span>

                        <h3 className="text-xl font-bold text-archival-ink font-mono mb-2 group-hover:text-archival-accent">
                            {note.title}
                        </h3>
                        <p className="text-archival-ink/80 font-sans line-clamp-2 leading-relaxed">
                            {note.content}
                        </p>
                        <div className="mt-4 text-xs font-mono text-archival-muted">
                            LOGGED: {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Dashboard;