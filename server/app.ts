import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from 'node:path';
import fs from 'node:fs';
import compression from 'compression';

import { SYSTEM_PROMPT } from "./prompts/main-leo.js";
import { ChatOpenAI } from "@langchain/openai";
// import { initializeVectorStore } from './vectorStore.js'

dotenv.config({ path: './server/.env' });

const app = express();
app.use(helmet());
app.use(express.json());
app.use(compression());

app.disable('x-powered-by');

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const distPath = path.join(process.cwd(), 'build'); // Vite builds to build directory
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

const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
  { role: 'system', content: SYSTEM_PROMPT }
];

const agentModel = new ChatOpenAI({ model: "gpt-4o" })

app.post("/api/chat", async (req, res) => {
  try {
    messages.push({ role: 'user', content: req.body.payload });

    const response = await agentModel.stream(messages)

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    let responseStr = ''
    
    // Stream the response
    for await (const chunk of response) {
      const content = chunk.content;
      responseStr += content;
      res.write(content);
      res.flush?.(); // Force immediate flush of the chunk
      // await new Promise(resolve => setTimeout(resolve, 1)); // Small delay to ensure chunks are separate
    }

    messages.push({ role: 'assistant', content: responseStr });

    res.end();
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

const port = 4000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, async () =>  {
    // const retrieverTool = await initializeVectorStore()
    // const results = await retrieverTool.invoke({"query": "what is happiness?"})

    // console.log(results)
    console.log(`API on http://localhost:${port}`)});
}

export default app;

