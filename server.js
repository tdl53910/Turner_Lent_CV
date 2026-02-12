require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));

app.post('/api/turner-bot', async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ reply: 'Server missing OPENAI_API_KEY.' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ reply: 'Invalid message payload.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ reply: `OpenAI error: ${errorText}` });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return res.json({ reply: reply || 'No response returned.' });
  } catch (error) {
    return res.status(500).json({ reply: 'Server error while contacting OpenAI.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
