function App() {
  return (
    <div className="min-h-screen bg-archival-paper text-archival-ink flex items-center justify-center p-4">
      <div className="bg-archival-card p-8 border border-archival-border shadow-sm max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-archival-accent rounded-full"></div>
          <h1 className="text-2xl font-mono font-bold tracking-tight">CARTON.</h1>
        </div>
        
        <p className="font-sans text-archival-ink mb-6 leading-relaxed">
          System initialized. v4 CSS engine active.
        </p>
        
        <div className="flex flex-col gap-3">
          <button className="w-full py-3 bg-archival-accent text-white font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer">
            Enter System
          </button>
          <button className="w-full py-3 border border-archival-ink text-archival-ink font-mono text-sm uppercase tracking-wider hover:bg-archival-border/20 transition-colors cursor-pointer">
            Read Documentation
          </button>
        </div>
        
        <div className="mt-8 pt-4 border-t border-archival-border text-xs font-mono text-archival-muted text-center">
          V.1.0 // AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
    </div>
  );
}

export default App;