import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-700 to-red-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t('heroTitle')}
                </h1>
                <p className="text-xl text-red-100 mb-8">
                  {t('heroText')}
                </p>
              </motion.div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://s3.eu-central-1.amazonaws.com/strapi.dundle.com/ou_et_comment_acheter_carte_neosurf_en_ligne_image_dundle_169bb11d25.png"
                  alt={t('heroAlt')}
                  className="rounded-lg shadow-xl max-w-md w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white">
                {t('methodsTitle')}
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                {t('methodsText')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {methods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-6">
                    <motion.div
                      className="h-48 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 5 }}
                    >
                        <img
                          src={method.image}
                          alt={method.title}
                          className="max-h-full object-contain"
                        />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-black mb-2">{method.title}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t('formSectionTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('formSectionText')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-50 p-8 rounded-lg border border-red-100">
                <h2 className="text-2xl font-bold text-red-800 mb-4">{t('guarantees')}</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </span>
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
