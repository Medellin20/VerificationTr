import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, LockKeyhole, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { useI18n } from '../i18n';

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const methods = [
    { image: "images/zola.png", title: "Apple Card", description: t('appleDesc') },
    { image: "https://s3.eu-central-1.amazonaws.com/strapi.dundle.com/ou_et_comment_acheter_carte_neosurf_en_ligne_image_dundle_169bb11d25.png", title: "Neosurf", description: t('neosurfDesc') },
    { image: "images/zero.png", title: "TransCash", description: t('transcashDesc') },
    { image: "images/zazi.png", title: "Steam Card", description: t('steamDesc') },
    { image: "images/ziza.png", title: "Google Play Card", description: t('googleDesc') },
    { image: "images/zeze.png", title: "Paysafecard", description: t('paysafeDesc') }
  ];
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#fff8f7]">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#4b0f1a] via-[#681524] to-[#18090e] py-12 text-white sm:py-14 lg:py-16">
          <div className="hero-glow absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#d94855]/30 blur-3xl" />
          <div className="hero-glow absolute -bottom-48 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#8f263c]/30 blur-3xl" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#ffb2a9]">
                  <Sparkles className="h-3.5 w-3.5" /> Assistance de confiance
                </div>
                <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:mb-5">
                  {t('heroTitle')}
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
                  {t('heroText')}
                </p>
              </motion.div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="hero-card relative w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-2.5 shadow-2xl shadow-black/30 backdrop-blur-md">
                <img
                  src="https://s3.eu-central-1.amazonaws.com/strapi.dundle.com/ou_et_comment_acheter_carte_neosurf_en_ligne_image_dundle_169bb11d25.png"
                  alt={t('heroAlt')}
                  className="aspect-[16/9] w-full rounded-xl object-cover shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/20 bg-[#27202f]/90 px-4 py-3 text-xs font-semibold shadow-xl backdrop-blur">
                  <LockKeyhole className="h-4 w-4 text-[#ff8177]" /> Données protégées
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div
          className="relative isolate overflow-hidden bg-[#260910] py-14 sm:py-16"
          style={{ backgroundImage: "url('/public.avif')", backgroundPosition: 'center', backgroundSize: 'cover' }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#260910]/95 via-[#3d0c17]/90 to-[#260910]/95" />
          <div className="pointer-events-none absolute -right-20 top-10 -z-10 hidden h-[25rem] w-[34rem] rotate-[-8deg] opacity-[0.13] blur-[1px] lg:block" aria-hidden="true">
            <div className="absolute right-20 top-10 h-52 w-80 rotate-[12deg] overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-2xl">
              <img src="images/zola.png" alt="" className="h-full w-full object-contain p-5" />
            </div>
            <div className="absolute right-0 top-24 h-52 w-80 rotate-[-12deg] overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-2xl">
              <img src="images/zazi.png" alt="" className="h-full w-full object-contain p-5" />
            </div>
            <div className="absolute right-36 top-36 h-52 w-80 rotate-[3deg] overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-2xl">
              <img src="images/zeze.png" alt="" className="h-full w-full object-contain p-5" />
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-8 text-center sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t('methodsTitle')}
              </h2>
              <p className="mt-3 text-base text-gray-400 sm:mt-4 sm:text-lg">
                {t('methodsText')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
              {methods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="group shine rounded-2xl border border-white/20 bg-[#fffdfc]/95 p-4 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffb2a9] hover:bg-white hover:shadow-xl sm:p-5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div>
                    <motion.div
                      className="mb-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-[#f1e3e1] bg-gradient-to-br from-[#fff8f7] to-[#f6e8e5] px-5"
                      whileHover={{ scale: 1.02 }}
                    >
                        <img
                          src={method.image}
                          alt={method.title}
                          className="h-full w-full object-contain"
                        />
                    </motion.div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold tracking-tight text-[#35101a]">{method.title}</h3>
                      <ArrowRight className="h-5 w-5 text-[#e34b55] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#6c5960]">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            className="mb-8 text-center sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#35101a] sm:text-4xl md:text-5xl">
              {t('formSectionTitle')}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
              {t('formSectionText')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#f2d8dc] bg-gradient-to-br from-[#fff4f3] to-[#f9eafa] p-7 shadow-xl shadow-[#e62e46]/5 sm:p-9">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ff8177]/20 blur-2xl" />
                <h2 className="relative mb-5 text-2xl font-bold text-[#8f263c]">{t('guarantees')}</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-3 mt-0.5 h-6 w-6 shrink-0 text-[#e34b55]" />
                    <span className="text-gray-700">{t('guarantee1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </span>
                    <span className="text-gray-700">{t('guarantee2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </span>
                    <span className="text-gray-700">{t('guarantee3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </span>
                    <span className="text-gray-700">{t('guarantee4')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <AuthForm />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
