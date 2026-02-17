export default async function handler(req, res) {
  // Vercel Environment Variable ကနေ Token ယူမယ်
  const token = process.env.VERCEL_TOKEN;

  // UI အတွက် လိုအပ်တဲ့ ဒေတာတွေကို Mock/Fetch လုပ်တဲ့အပိုင်း
  res.status(200).json({
    visitors: 1248,
    pageViews: 5820,
    topCountry: "Myanmar", // တကယ့် API ကနေ လာမယ့် နိုင်ငံ
    topDevice: "Mobile",    // တကယ့် API ကနေ လာမယ့် Device
    trend: [150, 420, 310, 850, 590, 1100, 980]
  });
}
