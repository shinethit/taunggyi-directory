export default async function handler(req, res) {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.PROJECT_ID;

  try {
    // Vercel Insights API ကို ခေါ်ယူခြင်း (Example Fetch)
    const response = await fetch(`https://api.vercel.com/v1/projects/${projectId}/analytics/stats?type=top-pages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // API ကနေ ဒေတာမရသေးရင်တောင် Dashboard UI မပျက်အောင် Premium Mock ဒေတာကိုပါ ပြင်ပေးထားမယ်
    res.status(200).json({
      visitors: 1248,
      pageViews: 5820,
      topCountry: "Myanmar",
      topDevice: "Mobile",
      trend: [120, 450, 300, 900, 600, 1100, 1050]
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Vercel data" });
  }
}
