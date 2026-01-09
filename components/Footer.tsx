export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <h4 className="font-heading text-2xl font-bold tracking-tighter text-white">AICE</h4>
          <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase">
            Artificial Intelligence Center of Excellence
          </p>
        </div>

        <div className="flex gap-8 text-xs text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        <div className="text-gray-600 text-[10px] uppercase tracking-widest">
          © 2026 AICE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

