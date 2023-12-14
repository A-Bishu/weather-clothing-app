
//server.js

import express from 'express';

import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const app = express();

const PORT = 5000;
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Middleware to handle JSON payloads
app.use(express.json());

app.use(cors());

app.post("/completion", async (req, res) => {
  try {
    const messages = req.body.messages;

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    res.json(completion.choices[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to get completion" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});