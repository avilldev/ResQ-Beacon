
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-[#090A0F]/95 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-3 h-3 bg-red-600 rounded-sm animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>

          <span className="text-xl font-black tracking-tight uppercase text-white group-hover:text-slate-300 transition-colors">
            ResQ-Beacon
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/request"
            className="text-xs font-bold tracking-widest uppercase bg-red-600 hover:bg-red-700 text-white px-4 py-2 border border-red-500 transition-colors"
          >
            Request Help
          </Link>
        </nav>

      </div>
    </header>
  );
}
