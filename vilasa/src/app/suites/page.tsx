import { SuitesClient } from './SuitesClient';
import { Footer } from '@/components/layout/Footer';

export default function SuitesPage() {
  return (
    <main className="bg-ivory min-h-screen text-ink">
      <div className="pt-32 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-serif text-5xl md:text-8xl text-ink mb-6">
          Suites & Villas
        </h1>
        <p className="font-sans text-ink/70 max-w-2xl text-lg leading-relaxed mb-16">
          Thirty keys. Each a private sanctuary. Designed to honor the heritage of the royal family while offering every modern indulgence.
        </p>
      </div>

      <SuitesClient />

      <Footer />
    </main>
  );
}
