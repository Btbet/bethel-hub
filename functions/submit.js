export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();

  const ua = request.headers.get("User-Agent") || "";

  // Device Type
  let deviceType = "Desktop";
  if (/iPad|Tablet/i.test(ua)) {
    deviceType = "Tablet";
  } else if (/Android|iPhone|Mobile/i.test(ua)) {
    deviceType = "Mobile";
  }

  // Browser
  let browser = "Unknown";
  if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";

  // Operating System
  let os = "Unknown";
  if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";

  // Cloudflare Geolocation
  const country = request.cf?.country || "Unknown";
  const city = request.cf?.city || "Unknown";

  await env.DB
    .prepare(`
      INSERT INTO submissions
      (name, email, phone, device_type, browser, os, country, city)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      data.name,
      data.email,
      data.phone,
      deviceType,
      browser,
      os,
      country,
      city
    )
    .run();

  return new Response(
    JSON.stringify({
      success: true,
      message: `${data.name}, your details have been submitted successfully!`
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
