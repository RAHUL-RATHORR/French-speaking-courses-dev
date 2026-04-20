import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Support &amp; Aide</h1>
        <p className="text-lg text-gray-700 mb-8">
          Besoin d&apos;aide ? Retrouvez ici les réponses aux questions fréquentes, contactez notre équipe ou explorez nos ressources d&apos;assistance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/support/faq" className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">FAQ</h2>
            <p className="text-gray-600">Questions fréquentes sur nos cours, paiements, accès, et plus.</p>
          </Link>
          <Link href="/#contact" className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p className="text-gray-600">Contactez notre équipe de support pour toute demande ou assistance personnalisée.</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
