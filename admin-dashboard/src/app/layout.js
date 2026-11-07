import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'ResQ-Beacon | Tactical Emergency Response',
  description: 'Rapid Relief Coordination Powered by AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#090A0F] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-red-900 selection:text-red-100 font-sans">
        {/* Tactical Amber Banner */}
        <div className="w-full bg-amber-500 text-black px-4 py-1.5 flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b border-amber-700">
          ⚠️ Hackathon Demo Prototype — Not an operational emergency service.
        </div>

        <Navbar />
        
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}