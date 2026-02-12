const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed.' });
  }

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
}
