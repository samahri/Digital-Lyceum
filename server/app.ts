import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from 'node:path';
import fs from 'node:fs';
import compression from 'compression';

import { SYSTEM_PROMPT } from "./prompts/main-leo.ts"
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config({ path: './server/.env' });

const app = express();
app.use(helmet());
app.use(express.json());
app.use(compression());

app.disable('x-powered-by');

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const distPath = path.join(process.cwd(), 'dist'); // if Vite builds to client/dist, use 'client/dist'
const indexHtml = path.join(distPath, 'index.html');

// SPA fallback: send index.html for non-API routes
app.get(/^(?!\/api\/).+$/, (_req, res) => {
  // read once per request to allow Vite HTML transforms you may have baked in
  const html = fs.readFileSync(indexHtml, 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// In dev you can skip CORS if you use the Vite proxy (recommended).
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN?.split(",") ?? [],
  credentials: true,
}));

const messages = [new SystemMessage(SYSTEM_PROMPT)]

// Optional: issue an httpOnly session cookie after login
app.post("/api/chat", async (req, res) => {

  const agentModel = new ChatOpenAI({ model: "gpt-4o" })

  messages.push(new HumanMessage(req.body.payload))

  const response = await agentModel.invoke(messages)

  res.json({ ok: true, data: response.content });
});

const port = 4000;
// app.listen(port, () => console.log(`API on http://localhost:${port}`));
export default app;

