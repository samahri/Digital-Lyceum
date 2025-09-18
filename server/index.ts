import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());

// In dev you can skip CORS if you use the Vite proxy (recommended).
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN?.split(",") ?? [],
  credentials: true,
}));

// Example: non-sensitive runtime config (OK to send)
app.get("/api/config", (_req, res) => {
  console.log('hello')
});

// Example: server-to-server call that uses your secret
// app.get("/api/weather", async (_req, res) => {
//   const key = process.env.THIRD_PARTY_API_KEY!;
//   const r = await fetch(`https://thirdparty.example.com/weather?zip=94110&key=${key}`);
//   if (!r.ok) return res.status(502).json({ error: "Upstream failed" });
//   const data = await r.json();
//   res.json(data); // Return data—not the key
// });

// Optional: issue an httpOnly session cookie after login
app.post("/api/chat", (req, res) => {
  // ...validate credentials...
  const sampleResponses = [
    "Excellent question! In Aristotle's Nicomachean Ethics, he argues that virtue is a mean between extremes. What aspect would you like to explore?",
    "As Aristotle taught, 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.' How can I help you understand his teachings?",
    "Let's examine this through Aristotelian logic. In his Organon, he established the foundations of reasoning. What specific work interests you?",
    "Aristotle believed that 'All men by nature desire to know.' What philosophical concept would you like to discover today?",
    "In the spirit of the Lyceum, let's walk through this idea together. Aristotle's teachings span ethics, politics, physics, and metaphysics. Where shall we begin?",
  ];
  
  const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
  
  res.cookie("sid", "signed-session-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // set true in prod w/ HTTPS
  });
  res.json({ ok: true, data: response });
});

const port = 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
