'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RequestHelp() {
  const [formData, setFormData] = useState({ message: '', location: '' });
  const [status, setStatus] = useState('idle');
  const [requestId, setRequestId] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // In production set this in Vercel to https://api.your-domain.xyz
    const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  ).replace(/\/+$/, '');

  async function analyzeSavedRequest(id) {
    setStatus('analyzing');
    try {
      const response = await fetch(`${API_URL}/requests/${id}/analyze`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error(`AI returned HTTP ${response.status}`);
      const result = await response.json();
      setAnalysis(result.analysis);
      setStatus('success');
    } catch (error) {
      console.error('Saved report, but AI analysis failed:', error);
      setStatus('saved_without_analysis');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setRequestId(null);
    setAnalysis(null);

    try {
      // 1. Save the report to the backend and get its database ID.
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Submit returned HTTP ${response.status}`);

      const saved = await response.json();
      setRequestId(saved.id);
      setFormData({ message: '', location: '' });

      // 2. Run Ollama AI against that saved report and store the analysis.
      await analyzeSavedRequest(saved.id);
    } catch (error) {
      console.error('Could not save report:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 w-full">
      <div className="bg-[#0d0e15] border border-slate-800 p-8 relative shadow-2xl">
        <div className="border-b border-slate-800 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase text-white">Initiate Help Request</h1>
            <p className="text-sm font-mono text-slate-400 mt-2">Submit incident details for AI triage.</p>
          </div>
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest border border-red-900/50 bg-red-950/20 px-2 py-1">
            Priority Comm Channel
          </span>
        </div>

        {(status === 'success' || status === 'saved_without_analysis' || status === 'analyzing') ? (
          <div className="bg-emerald-950/30 border border-emerald-900 p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-emerald-400 uppercase">Demo Report #{requestId} Saved</h3>
            {status === 'analyzing' && (
              <p className="text-sm font-mono text-slate-300">Analyzing report with Ollama AI...</p>
            )}
            {status === 'saved_without_analysis' && (
              <div className="text-amber-300 text-sm font-mono">
                Your report was saved, but AI analysis is currently unavailable.
                <button
                  onClick={() => analyzeSavedRequest(requestId)}
                  className="block mt-3 border border-amber-500 px-4 py-2 hover:bg-amber-950"
                >
                  Retry AI Analysis
                </button>
              </div>
            )}
            {analysis && (
              <div className="text-left space-y-4 text-sm text-slate-200">
                <div>
                  <h4 className="font-bold uppercase text-amber-400">AI Summary</h4>
                  <p className="mt-1">{analysis.summary}</p>
                </div>
                <div>
                  <h4 className="font-bold uppercase text-amber-400">Reported Hazards</h4>
                  <ul className="list-disc pl-5 mt-1">
                    {analysis.hazards.map((hazard, index) => <li key={index}>{hazard}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold uppercase text-amber-400">Possible Needs</h4>
                  <ul className="list-disc pl-5 mt-1">
                    {analysis.possible_needs.map((need, index) => <li key={index}>{need}</li>)}
                  </ul>
                </div>
                <p className="text-amber-300 text-xs font-mono">AI-generated observations. Human review required. No dispatch was initiated.</p>
              </div>
            )}
            {status !== 'analyzing' && (
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 self-start text-xs font-bold tracking-widest uppercase bg-slate-900 hover:bg-slate-800 text-slate-100 px-6 py-3 border border-slate-700 transition-colors"
              >
                Submit Another Request
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-xs text-amber-400 font-mono">Hackathon prototype only. Not connected to emergency services. For a real emergency, call local emergency services.</p>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                Incident Location <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Sector 4, Elm Street Bridge"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-[#12141c] border border-slate-700 p-4 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                Situation Report <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="5"
                placeholder="Describe the emergency, hazards, and immediate needs..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#12141c] border border-slate-700 p-4 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600 resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="text-red-500 text-xs font-mono font-bold">Could not save report. Check the backend URL and that FastAPI is running.</div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <Link href="/" className="text-xs font-mono text-slate-500 hover:text-slate-300">← Abort</Link>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest border border-red-500 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'submitting' ? 'Transmitting...' : 'Transmit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}