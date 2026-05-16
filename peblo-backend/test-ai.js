import 'dotenv/config';

const BASE_URL = process.env.LLM_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const API_KEY  = process.env.LLM_API_KEY;

// NVIDIA NIM models available on integrate.api.nvidia.com
const models = [
  'meta/llama-3.1-8b-instruct',
  'mistralai/mistral-7b-instruct-v0.3',
  'microsoft/phi-3-mini-128k-instruct',
];

console.log('Testing NVIDIA NIM models...\n');

for (const model of models) {
  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Say hello in one sentence.' }],
        max_tokens: 30,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(`❌ ${model}: ${data?.detail || data?.message || JSON.stringify(data)}`);
    } else {
      const reply = data.choices?.[0]?.message?.content?.trim();
      console.log(`✅ ${model}: WORKS! → "${reply}"`);
      break; // Stop at first working model
    }
  } catch (e) {
    console.log(`❌ ${model}: ${e.message}`);
  }
}
