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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#faf8fc]">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-[#17131d] py-16 text-white sm:py-20 lg:py-28">
          <div className="hero-glow absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#e62e46]/40 blur-3xl" />
          <div className="hero-glow absolute -bottom-48 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#743b9e]/30 blur-3xl" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#ffb2a9]">
                  <Sparkles className="h-3.5 w-3.5" /> Assistance de confiance
                </div>
                <h1 className="mb-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:mb-6">
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
                <div className="hero-card relative rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-md">
                <img
                  src="https://s3.eu-central-1.amazonaws.com/strapi.dundle.com/ou_et_comment_acheter_carte_neosurf_en_ligne_image_dundle_169bb11d25.png"
                  alt={t('heroAlt')}
                  className="w-full max-w-md rounded-[1.4rem] object-cover shadow-xl lg:max-w-none"
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
        <div className="bg-[#211b29] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-8 text-center sm:mb-12"
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {methods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="group shine rounded-3xl border border-white/10 bg-white p-5 shadow-xl shadow-black/10 transition-shadow duration-300 hover:shadow-2xl sm:p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-4 sm:p-6">
                    <motion.div
                      className="mb-5 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-[#faf8fc] to-[#f1eaf4] sm:h-44 lg:h-48"
                      whileHover={{ rotate: 5 }}
                    >
                        <img
                          src={method.image}
                          alt={method.title}
                          className="max-h-full object-contain"
                        />
                    </motion.div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-[#211b29]">{method.title}</h3>
                      <ArrowRight className="h-5 w-5 text-[#e34b55] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            className="mb-8 text-center sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#211b29] sm:text-4xl md:text-5xl">
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
