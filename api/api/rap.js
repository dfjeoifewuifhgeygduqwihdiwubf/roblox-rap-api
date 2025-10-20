export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?limit=100`;
    const response = await fetch(url);
    const data = await response.json();

    let totalRAP = 0;
    for (const item of data.data) {
      if (item.recentAveragePrice) totalRAP += item.recentAveragePrice;
    }

    res.status(200).json({
      userId,
      totalRAP,
      itemCount: data.data.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch RAP" });
  }
}
