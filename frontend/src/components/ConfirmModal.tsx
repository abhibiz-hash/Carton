import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isDestructive?: boolean;
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDestructive = false
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-archival-ink/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-archival-paper w-full max-w-sm border-2 border-archival-ink shadow-2xl relative">

                {/* Warning Strip */}
                <div className="bg-archival-ink text-archival-paper p-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-archival-paper" />
                    <h2 className="font-mono font-bold tracking-wider uppercase text-sm">
                        {title}
                    </h2>
                </div>

                <div className="p-6">
                    <p className="font-sans text-archival-ink text-sm leading-relaxed mb-6">
                        {message}
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 font-mono text-xs text-archival-muted hover:text-archival-ink border border-transparent hover:border-archival-border transition-all cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 font-mono text-xs text-white uppercase tracking-wider transition-opacity cursor-pointer ${isDestructive ? 'bg-archival-red' : 'bg-archival-accent'
                                }`}
                        >
                            CONFIRM ACTION
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;