import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "./prompts/main-leo.ts"

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config({ path: './server/.env' });

const app = express();
app.use(helmet());
app.use(express.json());

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
app.listen(port, () => console.log(`API on http://localhost:${port}`));
