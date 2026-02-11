'use client';

import { motion } from 'motion/react';
import { ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';

export function CTASection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    try {
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus({ type: 'error', message: 'Imię, email i wiadomość są wymagane.' });
        setIsSubmitting(false);
        return;
      }
      const timestamp = new Date().toISOString();
      const key = `contact:${Date.now()}:${formData.email}`;
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        timestamp,
        status: 'new',
      };
      try {
        const existingData = localStorage.getItem('contact_submissions');
        const submissions = existingData ? JSON.parse(existingData) : [];
        submissions.push({ key, ...submissionData });
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      } catch {
        // ignore
      }
      setSubmitStatus({
        type: 'success',
        message: '✅ Dziękujemy za wiadomość! Odpowiemy wkrótce.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Błąd: ' + (err instanceof Error ? err.message : 'Nieznany błąd') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[1000px] sm:h-[1000px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <Send className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Chcesz spróbować?</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Toniesz w codziennych zadaniach? Czas to zmienić.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Powiedz nam, co zabiera Ci najwięcej czasu - my zautomatyzujemy te procesy i przyspieszymy pracę Twojej firmy. Dzięki inteligentnym rozwiązaniom i AI odzyskasz godziny każdego dnia i skupisz się na tym, co naprawdę przynosi zysk.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent" />
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Imię i nazwisko</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jan Kowalski" required className="w-full h-12 min-h-12 px-4 rounded-xl text-white placeholder:text-slate-500 bg-slate-800/50 border border-slate-700 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jan@firma.pl" required className="w-full h-12 min-h-12 px-4 rounded-xl text-white placeholder:text-slate-500 bg-slate-800/50 border border-slate-700 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Telefon</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+48 123 456 789" className="w-full h-12 min-h-12 px-4 rounded-xl text-white placeholder:text-slate-500 bg-slate-800/50 border border-slate-700 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Wiadomość</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Opisz swój problem lub co chcesz usprawnić..." rows={5} required className="w-full min-h-12 px-4 py-3 rounded-xl text-white placeholder:text-slate-500 bg-slate-800/50 border border-slate-700 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none" />
                </div>
                <Button type="submit" variant="primary" fullWidth disabled={isSubmitting} className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Button>
                {submitStatus.type && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 px-4 py-3 rounded-xl text-center font-medium ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
