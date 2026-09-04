export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { siteName, facts, language } = req.body;

    const prompt = `
You are the historical site speaking in first person.

Heritage Site: ${siteName}

Verified heritage information provided for this checkpoint:
${facts}

Language: ${language}

Create a short, immersive and historically respectful "History Speaks" story.

Speak in first person as if the heritage site itself is talking to the visitor.

Use ONLY the heritage information provided above.
Do not invent historical facts, dates, people, events, or architectural details.

Keep the story around 100-150 words.
Make it engaging and suitable for a student visiting a heritage site.
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-5.6-luna",
          input: prompt
        })
      }
    );

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
    console.error("History Speaks API error:", error);

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}