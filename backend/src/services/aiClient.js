const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions';
const MODEL = process.env.HF_MODEL || 'openai/gpt-oss-120b:fastest';
const HF_TOKEN = process.env.HF_TOKEN;

async function generateArticle(topic = 'software engineering') {
  // Fallback dummy article if no token configured
  if (!HF_TOKEN) {
    return {
      title: `Dummy article about ${topic}`,
      content: `This is placeholder content about ${topic}.`
    };
  }

  const body = {
    model: MODEL,
    messages: [
      {
        role: 'user',
        content:
          'Generate a short blog post. Return a title on the first line, then a blank line, then the article body. Dont include bold text or markdown formatting.'
      }
    ],
    stream: false
  };

  const res = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HF error ${res.status}: ${text}`);
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content || '';
  const [firstLine, ...rest] = text.split('\n');
  const title = firstLine.trim() || 'Untitled';
  const content = rest.join('\n').trim() || text.trim();

  return { title, content };
}

module.exports = generateArticle;
