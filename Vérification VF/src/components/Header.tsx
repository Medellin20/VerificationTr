import React from 'react';
import { Languages, Mail } from 'lucide-react';
import { languages, Language, useI18n } from '../i18n';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-white" />
          <h1 className="text-xl md:text-2xl font-bold text-white">Verifcash</h1>
        </div>
        <nav className="flex items-center gap-3">
          <a href="/" className="hidden text-white transition-colors duration-200 hover:text-red-200 sm:block">{t('home')}</a>
          <div className="relative flex items-center">
            <Languages className="pointer-events-none absolute left-3 h-4 w-4 text-red-800" aria-hidden="true" />
            <label htmlFor="language-selector" className="sr-only">{t('language')}</label>
            <select id="language-selector" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="cursor-pointer rounded-lg border-0 bg-white py-2 pl-9 pr-8 text-sm font-semibold text-red-900 shadow-sm outline-none ring-red-200 focus:ring-2" aria-label={t('language')}>
              {languages.map(({ code, label, short }) => <option key={code} value={code}>{short} — {label}</option>)}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
