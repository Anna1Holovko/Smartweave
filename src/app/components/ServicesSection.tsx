import { motion } from 'motion/react';
import { Globe, Workflow, TrendingUp, Check, Palette } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Projektowanie i wdrażanie stron www',
    description:
      'Tworzymy nowoczesne strony internetowe dla małych i średnich firm, w pełni gotowe na AI. Szybko, przystępnie cenowo i w profesjonalnym stylu, który buduje zaufanie i sprzedaje.',
    features: [
      'Responsywne strony dostosowane do wszystkich urządzeń',
      'Optymalizacja SEO i integracja z wyszukiwarkami AI',
      'Spójna identyfikacja wizualna marki',
      'Hosting i wsparcie techniczne',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Identyfikacja wizualna i branding',
    description:
      'Tworzymy spójną identyfikację wizualną, która buduje rozpoznawalność i zaufanie do Twojej marki. Profesjonalnie, nowocześnie i konsekwentnie - na stronie, w reklamach i w codziennej komunikacji.',
    features: [
      'Projektowanie logo i znak graficzny',
      'Kolorystyka i typografia marki',
      'Materiały graficzne i szablony',
      'Brand guidelines dla zespołu',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Automatyzacja procesów i agenci AI',
    description:
      'Odzyskaj czas dzięki inteligentnym procesom, które działają za Ciebie. Dane, raporty i powiadomienia są przetwarzane automatycznie — Ty skupiasz się na tym, co naprawdę ważne.',
    features: [
      'Automatyczne przetwarzanie danych i raportów',
      'Inteligentne powiadomienia i alerty',
      'Integracje z narzędziami biznesowymi',
      'Agenci AI do obsługi powtarzalnych zadań',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Marketing internetowy',
    description:
      'Zwiększamy widoczność Twojej firmy w sieci i w wyszukiwarkach AI. Optymalizujemy Twoją obecność online, aby klienci łatwo Cię znaleźli.',
    features: [
      'SEO i GEO-SEO w AI – optymalizacja dla ChatGPT i wyszukiwarek AI',
      'Google Ads – skuteczne kampanie reklamowe',
      'Integracja z Google – konsola, GA4, Maps i wirtualny spacer',
      'Optymalizacja konwersji i lejka sprzedażowego',
    ],
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
          >
            <span className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Nasze usługi
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Jak możemy{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ci pomóc?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-4"
          >
            Specjalizujemy się w rozwiązaniach, które oszczędzają Twój czas i
            ułatwiają codzienną pracę. Poznaj nasze usługi.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] overflow-hidden">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}
                  >
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list for marketing */}
                {service.features && (
                  <div className="space-y-3 mt-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-slate-400"
                      >
                        <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom gradient line - visible only on hover */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center">
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4">
                Nie jesteś pewien, które rozwiązanie jest dla Ciebie?
              </h3>

              <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
                Umów bezpłatną konsultację – porozmawiamy o Twoich wyzwaniach i
                zaproponujemy najlepsze rozwiązanie.
              </p>

              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all"
              >
                Umów konsultację
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}