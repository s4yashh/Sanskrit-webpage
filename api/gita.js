export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  const chapter = parseInt(q, 10);
  if (isNaN(chapter) || chapter < 1 || chapter > 18) {
    return res.status(400).json({ error: "Chapter must be between 1 and 18" });
  }

  try {
    const response = await fetch(`https://sanskrit.ie/api/geeta.php?q=${chapter}`);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json");

    res.status(200).send(text);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ 
      error: "Failed to fetch data",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
