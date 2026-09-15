import React from 'react';
import { Languages, Mail, ShieldCheck } from 'lucide-react';
import { languages, Language, useI18n } from '../i18n';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#17131d]/90 shadow-lg shadow-[#17131d]/10 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b5f] to-[#e62e46] shadow-lg shadow-red-900/30">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <h1 className="truncate text-base font-bold tracking-tight text-white sm:text-xl md:text-2xl">Authentifcash</h1>
        </div>
        <nav className="flex shrink-0 items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs font-medium text-white/60 sm:flex">
            <ShieldCheck className="h-4 w-4 text-[#ff8177]" /> Sécurisé
          </span>
          <div className="relative flex items-center">
            <Languages className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-white/70" aria-hidden="true" />
            <label htmlFor="language-selector" className="sr-only">{t('language')}</label>
            <select id="language-selector" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="cursor-pointer rounded-xl border border-white/15 bg-white/10 py-2 pl-8 pr-7 text-xs font-semibold text-white outline-none transition-all hover:bg-white/20 focus:ring-2 focus:ring-[#ff8177]/60 [&>option]:text-gray-900" aria-label={t('language')}>
              {languages.map(({ code, label, short }) => <option key={code} value={code}>{short} — {label}</option>)}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
