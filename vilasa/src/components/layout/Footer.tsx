import Link from 'next/link';

const menuItems = [
  { name: 'THE LAKE', path: '/' },
  { name: 'THE PALACE', path: '/palace' },
  { name: 'SUITES & VILLAS', path: '/suites' },
  { name: 'EXPERIENCES', path: '/experiences' },
  { name: 'CELEBRATIONS', path: '/celebrations' },
  { name: 'JOURNAL', path: '/journal' },
  { name: 'RESERVE', path: '/reserve' },
];

export function Footer() {
  return (
    <footer className="bg-ink py-24 px-8 md:px-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-12 h-16 jharokha-mask bg-gold flex items-center justify-center mb-16">
          <span className="text-ink font-serif text-2xl font-bold">V</span>
        </div>

        {/* 7 pages restated */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 max-w-2xl">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-ivory/60 hover:text-gold font-sans text-[11px] uppercase tracking-[0.18em] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col items-center gap-4 mb-24">
          <a href="mailto:concierge@vilasa.com" className="text-ivory hover:text-gold font-serif italic text-lg transition-colors">
            concierge@vilasa.com
          </a>
          <a href="https://wa.me/1234567890" className="flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors">
            {/* Custom WhatsApp Glyph */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-sans text-[11px] uppercase tracking-[0.18em]">Concierge</span>
          </a>
        </div>

        {/* Socials & Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gold/10 gap-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/40">
            © {new Date().getFullYear()} VILASA UDAIPUR
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Pinterest'].map((social) => (
              <a key={social} href="#" className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/40 hover:text-gold transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
