import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-widest">
            <span className="w-2 h-2 bg-blue-500 rounded-sm"></span>
            AI for Humanity • Emergency Coordination
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] uppercase">
            Rapid Relief Coordination <br className="hidden sm:block" />
            <span className="text-red-600">Powered by AI.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-mono">
            ResQ-Beacon instantly triages incoming disaster relief requests, assessing urgency and routing aid where it is needed most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Link 
              href="/request" 
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest border border-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              I Need Emergency Assistance
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center gap-3 bg-transparent hover:bg-slate-900 text-slate-300 px-8 py-4 font-bold uppercase tracking-widest border border-slate-700 hover:border-slate-500 transition-all"
            >
              Open Responder Dashboard
            </Link>
          </div>

          {/* Dynamic Status Tickers */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 mt-6">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 font-mono">System Network</div>
              <div className="text-emerald-500 font-bold flex items-center gap-2 font-mono text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-sm animate-pulse"></div>
                ACTIVE & ROUTING
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Avg Triage Processing</div>
              <div className="text-slate-200 font-bold font-mono text-sm">0.84 SECONDS</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Dispatched Units</div>
              <div className="text-slate-200 font-bold font-mono text-sm">14 TEAMS</div>
            </div>
          </div>
        </div>

        {/* Right Column: Scannable Live-Activity Panel */}
        <div className="lg:col-span-5 w-full bg-[#0d0e15] border border-slate-800 shadow-2xl relative">
          {/* Panel Header */}
          <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 flex justify-between items-center">
            <span className="text-[11px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Terminal Feed
            </span>
            <span className="text-[10px] font-mono text-red-400 bg-red-950/50 px-2 py-0.5 border border-red-900 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              Live
            </span>
          </div>
          
          {/* Feed Items */}
          <div className="p-4 flex flex-col gap-3 h-[400px] overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d0e15] to-transparent z-10"></div>

            {/* Event Card: Critical */}
            <div className="bg-[#12141c] border border-red-900/50 p-4 flex flex-col gap-2 relative group hover:border-red-500/50 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
              <div className="flex justify-between items-start pl-2">
                <span className="text-xs font-mono text-red-500 font-bold uppercase">Critical • Medical</span>
                <span className="text-[10px] font-mono text-slate-500">SYS_TIME: NOW</span>
              </div>
              <div className="text-sm text-slate-200 pl-2 leading-relaxed">Multiple injuries reported at Sector 4 collapse. Immediate evacuation required.</div>
              <div className="text-[11px] font-mono text-slate-500 pl-2 mt-1">GEO: 45.4215° N, 75.6972° W</div>
            </div>

            {/* Event Card: High */}
            <div className="bg-[#12141c] border border-amber-900/30 p-4 flex flex-col gap-2 relative group hover:border-amber-500/50 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
              <div className="flex justify-between items-start pl-2">
                <span className="text-xs font-mono text-amber-500 font-bold uppercase">High • Logistics</span>
                <span className="text-[10px] font-mono text-slate-500">SYS_TIME: T-02:14</span>
              </div>
              <div className="text-sm text-slate-200 pl-2 leading-relaxed">Main access route blocked by debris. Supply trucks rerouting to Zone B.</div>
              <div className="text-[11px] font-mono text-slate-500 pl-2 mt-1">GEO: Elm St. Bridge</div>
            </div>

            {/* Event Card: Medium */}
            <div className="bg-[#12141c] border border-slate-800 p-4 flex flex-col gap-2 relative group hover:border-slate-600 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-600"></div>
              <div className="flex justify-between items-start pl-2">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase">Medium • Shelter</span>
                <span className="text-[10px] font-mono text-slate-500">SYS_TIME: T-14:05</span>
              </div>
              <div className="text-sm text-slate-200 pl-2 leading-relaxed">Temporary housing capacity at 90%. Requesting overflow tents for arrival cohort.</div>
              <div className="text-[11px] font-mono text-slate-500 pl-2 mt-1">GEO: Community Center Alpha</div>
            </div>
          </div>

          {/* Panel Footer Action */}
          <Link href="/dashboard" className="w-full flex items-center justify-center bg-[#12141c] border-t border-slate-800 p-3 text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 uppercase tracking-widest transition-colors z-20 relative">
            Access Full Terminal Feed →
          </Link>
        </div>

      </div>
    </div>
  );
}