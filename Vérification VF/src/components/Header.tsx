import React from 'react';
import { Languages, Mail } from 'lucide-react';
import { languages, Language, useI18n } from '../i18n';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2">
          <Mail className="h-6 w-6 shrink-0 text-white sm:h-8 sm:w-8" />
          <h1 className="truncate text-base font-bold text-white sm:text-xl md:text-2xl">Authentifcash</h1>
        </div>
        <nav className="flex shrink-0 items-center gap-3">
          <div className="relative flex items-center">
            <Languages className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-white/70" aria-hidden="true" />
            <label htmlFor="language-selector" className="sr-only">{t('language')}</label>
            <select id="language-selector" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="cursor-pointer rounded-md border border-white/20 bg-white/10 py-1.5 pl-8 pr-7 text-xs font-medium text-white outline-none transition-colors hover:bg-white/15 focus:ring-2 focus:ring-white/40 [&>option]:text-gray-900" aria-label={t('language')}>
              {languages.map(({ code, label, short }) => <option key={code} value={code}>{short} — {label}</option>)}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
