export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { siteName } = req.body;

    const stories = {
      "Amar Singh Gate": `
I am the Amar Singh Gate, one of the historic gateways of Agra Fort.

For centuries, visitors have passed through my entrance to enter the fortified world of Agra. I stand as a reminder of the powerful Mughal presence that shaped this city.

Look closely at my massive gateway and imagine the movement of soldiers, visitors and members of the royal establishment who once passed through these spaces.

Today, I welcome a different kind of visitor — curious explorers who want to understand India's heritage.

As you continue your journey through Agra Fort, remember that every gate, wall and courtyard has a story waiting to be discovered.

Your quest begins here. Look around, observe carefully and let history speak.
`,

      "Diwan-i-Aam": `
I am the Diwan-i-Aam, the Hall of Public Audience within Agra Fort.

Imagine standing here during the Mughal period, when this space was connected with the emperor's public duties and interactions.

My architecture reflects the grandeur and organization of the Mughal court. The open spaces around me once formed part of an important royal environment.

Today, the voices of the past have disappeared, but my walls remain.

When you stand here, don't just look at the stones. Think about the people who once gathered in this space and the decisions that shaped their world.

History is not only found in books.

Sometimes, it is standing silently in front of you.

Look closely. Your next clue may be hidden in what you see.
`,

      "Diwan-i-Khas": `
I am the Diwan-i-Khas, the Hall of Private Audience at Agra Fort.

Unlike spaces intended for public gatherings, I was associated with the more private side of royal life.

Imagine the Mughal court surrounding you — officials, visitors and important discussions taking place within the fortified palace complex.

My architecture was created to express the prestige and sophistication of the Mughal court.

Today, I stand quietly, but the details around me continue to tell stories about India's architectural and political history.

Take a moment to observe the design around you.

Can you identify something that makes this space different from the public areas of the fort?

That observation could be the key to your next quest.
`,

      "Musamman Burj": `
I am the Musamman Burj, a beautiful octagonal tower overlooking the Yamuna River.

From here, the relationship between Agra Fort, the river and the surrounding landscape becomes especially visible.

My location within the fort reminds visitors that Mughal architecture was not only about strength and defense. It also incorporated carefully designed spaces connected with views, gardens and royal life.

Look toward the horizon and imagine Agra centuries ago.

The landscape has changed, the people have changed, but the fort remains a remarkable link to the past.

Stand here for a moment.

Observe the view.

Then ask yourself: why would a royal complex place such importance on a location like this?

Your answer may reveal more about the people who once lived within these walls.
`,

      "Jahangir Palace": `
I am the Jahangir Palace, one of the important structures within Agra Fort.

My architecture reflects the rich artistic traditions associated with the Mughal period, while also showing the influence of Indian architectural elements.

Look carefully at the proportions, stonework and decorative details around you.

Buildings like me were not simply places to live. They were part of a much larger royal complex where architecture, administration and everyday life came together.

Today, visitors walk through my spaces trying to understand what life may have been like centuries ago.

But remember — heritage is not only about famous rulers.

It is also about the craftsmen, builders and countless people whose work created these remarkable structures.

Your next quest begins with observation.

What architectural detail catches your eye first?
`
    };

    // Find the story using the checkpoint name
    let story = stories[siteName];

    // Fallback if the exact name isn't found
    if (!story) {
      story = `
I am a living piece of India's heritage.

My walls have witnessed generations of people, changing kingdoms and countless stories.

Today, you are standing before me with an opportunity to look beyond what is visible.

Every architectural detail, every stone and every pathway can reveal something about the people who created and used this place.

Take a moment.

Observe your surroundings.

Ask questions.

And most importantly, remember that heritage is not simply something from the past.

It is a connection between the past and you.

History speaks when you choose to listen.
`;
    }

    return res.status(200).json({
      story: story.trim()
    });

  } catch (error) {
    console.error("History Speaks error:", error);

    return res.status(500).json({
      error: "Unable to generate heritage story"
    });
  }
}