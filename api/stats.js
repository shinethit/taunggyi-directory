export default async function handler(req, res) {
  const token = process.env.VERCEL_TOKEN;
  // Vercel Analytics API ကို လှမ်းခေါ်တဲ့အပိုင်း (Example logic)
  try {
    const response = await fetch('https://vercel.com/api/web-analytics/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // API အစစ်မရသေးခင် Dashboard UI မပျက်အောင် Mock Data ပြန်ပေးထားမယ်
    res.status(200).json({
      visitors: 1250,
      pageViews: 4800,
      bounceRate: "15%",
      topPages: [ { path: '/', views: 2100 }, { path: '/knowledge', views: 1500 } ]
    });
  }
}
