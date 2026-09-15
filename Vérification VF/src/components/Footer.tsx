import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useI18n } from '../i18n';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();
  
  return (
    <footer className="bg-[#260910] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-extrabold tracking-tight">Authentif<span className="text-[#ff8177]">cash</span></h3>
            <p className="mb-5 text-sm leading-relaxed text-white/55">
              {t('footerText')}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 transition-colors hover:text-[#ff8177]">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 transition-colors hover:text-[#ff8177]">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 transition-colors hover:text-[#ff8177]">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 transition-colors hover:text-[#ff8177]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('about')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('services')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('blogs')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('faq')}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('help')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('terms')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('privacy')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">{t('contact')}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-4">
             
              <li className="flex min-w-0 items-center gap-3">
                <Mail size={20} className="shrink-0 text-red-500" />
                <span className="min-w-0 break-all text-gray-400">support@authentifcash.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="text-center text-sm text-white/40">
            <p>&copy; {currentYear} Authentifcash. {t('rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
