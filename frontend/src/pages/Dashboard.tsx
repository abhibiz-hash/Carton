import { useEffect, useState } from 'react';
import api from '../api/client';
import Layout from '../components/Layout';
import { Plus, Search, Trash2 } from 'lucide-react';
import CreateNoteModal from '../components/CreateNoteModal';
import ConfirmModal from '../components/ConfirmModal';


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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNotes = async (query = '') => {
        setIsLoading(true);
        try {

            const response = await api.get('/notes', {
                params: { search: query }
            });
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Delete
    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setNoteToDelete(id); // Opens the modal
    };
    const confirmDelete = async () => {
        if (!noteToDelete) return;

        try {
            await api.delete(`/notes/${noteToDelete}`);
            fetchNotes(searchQuery); // Refresh list
            setNoteToDelete(null);   // Close modal
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    // Search Handler 
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchNotes(searchQuery);
    };

    // Initial load
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <Layout>
            {/* Header Section */}
            <div className="flex flex-col gap-6 mb-8">

                {/* Title & Add Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-mono font-bold text-archival-ink">JOURNAL ENTRIES</h2>
                        <p className="text-archival-muted font-sans mt-1">
                            Archive contains {notes.length} records.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-archival-accent text-white px-4 py-2 font-mono text-sm flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                        <Plus size={16} />
                        <span>NEW ENTRY</span>
                    </button>
                </div>

                {/* Search Bar (Styled like a library index search) */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-archival-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-archival-paper border border-archival-border pl-10 pr-4 py-3 font-sans text-archival-ink focus:outline-none focus:border-archival-accent focus:ring-1 focus:ring-archival-accent/20 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 border border-archival-ink font-mono text-sm uppercase tracking-wider hover:bg-archival-ink hover:text-archival-paper transition-colors cursor-pointer"
                    >
                        Search
                    </button>
                </form>
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
                    <p className="font-mono text-archival-muted mb-4">NO MATCHING RECORDS</p>
                    <button
                        onClick={() => { setSearchQuery(''); fetchNotes(''); }}
                        className="text-archival-accent underline cursor-pointer"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Notes Grid */}
            <div className="grid gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-archival-card p-6 border border-archival-border hover:border-archival-accent transition-colors group relative shadow-sm"
                    >
                        {/* Category Tag */}
                        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase bg-archival-paper px-2 py-1 border border-archival-border text-archival-muted">
                            {note.category}
                        </span>

                        {/* Delete Button */}
                        <button
                            onClick={(e) => handleDeleteClick(e, note.id)}
                            className="absolute bottom-4 right-4 text-archival-muted hover:text-archival-red opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-2"
                            title="Delete Entry"
                        >
                            <Trash2 size={18} />
                        </button>

                        <h3 className="text-xl font-bold text-archival-ink font-mono mb-2 pr-12">
                            {note.title}
                        </h3>
                        <p className="text-archival-ink/80 font-sans line-clamp-2 leading-relaxed mb-4">
                            {note.content}
                        </p>
                        <div className="text-xs font-mono text-archival-muted border-t border-archival-border/50 pt-2">
                            LOGGED: {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!noteToDelete} 
                onClose={() => setNoteToDelete(null)}
                onConfirm={confirmDelete}
                title="PERMANENT DELETION"
                message="Are you sure you want to shred this record? This action cannot be undone and the data will be lost from the archive."
                isDestructive={true}
            />
            <CreateNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => fetchNotes(searchQuery)}
            />
        </Layout>
    );
};

export default Dashboard;