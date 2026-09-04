export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { place, checkpoint } = req.body;

    const prompt = `
You are the historical site speaking in first person.

Heritage site: ${place}
Checkpoint: ${checkpoint}

Tell a short, immersive and historically respectful story.
Speak as if you are the heritage site itself.
Keep it around 100-150 words.
Do not invent specific historical facts.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "OpenAI API error"
      });
    }

    return res.status(200).json({
      story: data.output_text
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}