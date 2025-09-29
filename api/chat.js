import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // simpan di Vercel Env
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek-ai/deepseek-r1",
      messages: req.body.messages,
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    res.status(200).json(completion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
