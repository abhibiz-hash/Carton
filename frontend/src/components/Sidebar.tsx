import { Link, useLocation } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
        <Link
            to={to}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-wide transition-colors",
                isActive(to)
                    ? "bg-archival-accent text-white"
                    : "text-archival-ink hover:bg-archival-border/30"
            )}
        >
            <Icon size={18} />
            <span>{label}</span>
        </Link>
    );

    return (
        <aside className="w-64 bg-archival-card border-r border-archival-border flex flex-col h-screen fixed left-0 top-0">
            {/* Brand */}
            <div className="p-8 border-b border-archival-border">
                <h1 className="text-2xl font-mono font-bold tracking-tight text-archival-ink">CARTON.</h1>
                <p className="text-xs text-archival-muted mt-1">Archive ID: {user?.name}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 flex flex-col gap-1">
                <NavItem to="/" icon={Home} label="JOURNAL ENTRIES" />
                <NavItem to="/profile" icon={User} label="RESEARCHER ID" />
            </nav>

            {/* Action Button */}
            <div className="p-4 border-t border-archival-border">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-mono text-archival-red hover:bg-archival-red/10 w-full transition-colors cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>TERMINATE SESSION</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;