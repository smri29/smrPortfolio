import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import compression from "compression";
import helmet from "helmet";

dotenv.config();

const app = express();

// ----------------------
// Core middleware
// ----------------------
app.use(express.json());
app.use(compression());
app.use(
  helmet({
    // Disable CSP by default to avoid blocking inline styles from Vite build, etc.
    contentSecurityPolicy: false,
  })
);

// ----------------------
// CORS
// ----------------------
const allowlist = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow Postman/curl
      if (allowlist.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ----------------------
// Health check
// ----------------------
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-backend",
    time: new Date().toISOString(),
  });
});

// ----------------------
// SMTP
// ----------------------
const SMTP_USER = process.env.SMTP_USER || "smri29.ml@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS;

if (!SMTP_PASS) {
  console.warn(
    "[WARN] SMTP_PASS missing. Create a Gmail App Password and set it in your .env."
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// verify at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("[SMTP VERIFY ERROR]", err.message || err);
  } else {
    console.log("[SMTP] Ready:", success);
  }
});

// ----------------------
// Helpers
// ----------------------
const escapeHtml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());

// ----------------------
// Contact endpoint
// ----------------------
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    if (!SMTP_PASS) {
      return res
        .status(500)
        .json({ error: "Email service not configured (missing SMTP_PASS)" });
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
        <h2>New message from your portfolio contact form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(
          message
        )}</pre>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`, // must match Gmail user
      to: "smri29.ml@gmail.com", // your inbox
      subject: `New message from ${name}`,
      replyTo: email,
      html,
    });

    console.log("[MAIL SENT]", info.messageId);
    res.json({ ok: true });
  } catch (err: any) {
    console.error("[MAIL ERROR]", err?.response || err?.message || err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ----------------------
// Static: serve React build
// (frontend/dist is copied to backend/public at build time)
// ----------------------
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// SPA fallback for client-side routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ----------------------
// Start server
// ----------------------
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
