import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-archival-paper">
            <Sidebar />
            <main className="ml-64 p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;