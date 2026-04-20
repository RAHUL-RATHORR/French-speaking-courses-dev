import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const faqs = [
  {
    question: "Comment puis-je accéder à mon cours après l'achat ?",
    answer: "Après l'achat, connectez-vous à votre compte et accédez à la section 'Mes cours' pour commencer."
  },
  {
    question: "Puis-je suivre les cours sur mobile ou tablette ?",
    answer: "Oui, notre plateforme est optimisée pour tous les appareils, y compris mobiles et tablettes."
  },
  {
    question: "Comment obtenir mon certificat ?",
    answer: "Une fois le cours terminé, vous pourrez télécharger votre certificat depuis la page du cours."
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes bancaires, PayPal et d'autres moyens de paiement sécurisés."
  },
  {
    question: "Comment contacter le support ?",
    answer: "Utilisez le formulaire de contact ou écrivez-nous à support@frenchcourses.com."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Foire aux questions (FAQ)</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold text-french-blue mb-2">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/#contact" className="text-french-blue hover:underline font-medium">Vous avez une autre question ? Contactez-nous</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
