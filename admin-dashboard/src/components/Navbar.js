
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-[#090A0F]/95 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ResQ-Beacon Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-3 h-3 bg-red-600 rounded-sm animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>

          <span className="text-xl font-black tracking-tight uppercase text-white group-hover:text-slate-300 transition-colors">
            ResQ-Beacon
          </span>
        </Link>

        {/* Admin Navigation */}
        <nav className="flex items-center gap-4" aria-label="Admin navigation">

          <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-red-500">
            Admin Workspace
          </span>

          <Link
            href="/dashboard"
            className="text-xs font-bold tracking-widest uppercase bg-slate-900 hover:bg-slate-800 text-slate-100 px-4 py-2 border border-slate-700 hover:border-slate-500 transition-colors"
          >
            Dashboard
          </Link>

        </nav>
      </div>
    </header>
  );
}
