import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready?: (cb: () => void) => void;
    };
  }
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target?.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!form?.name || !form.email || !form.message) {
      setError('Veuillez remplir tous les champs.');
      setLoading(false);
      return;
    }
    
    try {
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && window.grecaptcha && '6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO') {
        try {
          recaptchaToken = await window.grecaptcha.execute('6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO', { action: 'contact_submit' });
        } catch {}
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-lg mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contactez le support</h1>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-6 rounded-xl text-center">
            Merci pour votre message ! Notre équipe vous répondra sous 24h.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-french-blue"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-french-blue"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Téléphone (optionnel)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-french-blue"
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-french-blue"
                rows={5}
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-french-blue text-white font-bold py-3 rounded-lg hover:bg-french-blue/90 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
