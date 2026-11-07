'use client';

import { useState, useEffect } from 'react';

export default function ResponderDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchRequests = async () => {
  try {
    if (!API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL is missing');
    }

    const response = await fetch(`${API_URL}/requests`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setRequests(data);
    setError('');

  } catch (error) {
    console.error("Failed to fetch:", error);
    setError(
      `Could not connect to the backend at ${API_URL || 'unknown address'}. Check the server and network.`
    );

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRequests();
    // Auto-refresh every 10 seconds for the hackathon demo
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const triggerAIAnalysis = async (id) => {
    try {
      const response = await fetch(`${API_URL}/requests/${id}/analyze`, { method: 'POST' });
      if (!response.ok) {
  throw new Error(`AI returned HTTP ${response.status}`);
}

await fetchRequests();
    } catch (error) {
      console.error("Analysis failed:", error);
      setError('AI analysis failed. Check Ollama and the FastAPI terminal.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase text-white">Terminal Dashboard</h1>
          <p className="text-sm font-mono text-slate-400 mt-2">Live Incident Triage & AI Analysis</p>
        </div>
        <button onClick={fetchRequests} className="text-xs font-bold tracking-widest uppercase bg-slate-900 hover:bg-slate-800 text-slate-300 px-4 py-2 border border-slate-700 transition-colors">
          Refresh Feed
        </button>
      </div>

      {error && (
  <div
    role="alert"
    className="mb-6 bg-red-950/30 border border-red-800 text-red-300 p-4 text-sm font-mono"
  >
    {error}
  </div>
)}


      {loading ? (
        <div className="text-amber-500 font-mono text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span> Syncing with Command...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {!error && requests.length === 0 && (
            <div className="text-slate-500 font-mono text-sm p-8 bg-[#0d0e15] border border-slate-800">
              No active incidents detected in sector.
            </div>
          )}
          
          {requests.map((req) => (
            <div key={req.id} className="bg-[#0d0e15] border border-slate-800 p-6 flex flex-col lg:flex-row gap-6">
              
              {/* Core Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500 border border-slate-700 px-2 py-1">ID: {req.id}</span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">GEO: {req.location}</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed border-l-2 border-slate-700 pl-4">
                  "{req.message}"
                </p>
              </div>

              {/* AI Analysis Block */}
              <div className="flex-1 bg-[#12141c] border border-slate-800 p-4 relative">
                <div className="absolute top-0 right-0 px-2 py-1 bg-slate-900 border-b border-l border-slate-800 text-[10px] text-slate-500 font-mono uppercase">
                  AI Coprocessor
                </div>
                
                {req.analysis ? (
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">AI Summary</div>
                      <div className="text-sm text-amber-500 font-mono">{req.analysis.summary}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Hazards Detected</div>
                        <ul className="text-xs text-red-400 font-mono list-disc list-inside">
                          {req.analysis.hazards.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Estimated Needs</div>
                        <ul className="text-xs text-emerald-400 font-mono list-disc list-inside">
                          {req.analysis.possible_needs.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 pt-4">
                    <span className="text-xs font-mono text-slate-500">Analysis pending manual trigger</span>
                    <button 
                      onClick={() => triggerAIAnalysis(req.id)}
                      className="text-[10px] font-bold tracking-widest uppercase bg-slate-800 hover:bg-slate-700 text-amber-400 px-4 py-2 border border-amber-900/50 transition-colors w-full"
                    >
                      Run Triage AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}