'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RequestHelp() {
  const [formData, setFormData] = useState({ message: '', location: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setFormData({ message: '', location: '' });
    } catch (error) {
      console.error(error);
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

        {status === 'success' ? (
          <div className="bg-emerald-950/30 border border-emerald-900 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-400 uppercase">Transmission Successful</h3>
              <p className="text-sm font-mono text-slate-400 mt-1">Incident routed to responder dashboard for AI analysis.</p>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-bold tracking-widest uppercase bg-slate-900 hover:bg-slate-800 text-slate-100 px-6 py-3 border border-slate-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="text-red-500 text-xs font-mono font-bold">⚠️ Connection error. Check backend server.</div>
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