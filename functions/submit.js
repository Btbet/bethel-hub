// functions/submit.js

export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") || "Anonymous";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    await env.DB.prepare(`
      INSERT INTO submissions (name, email, message, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(name, email, message).run();

    return new Response(`
      <h2>Thank you!</h2>
      <p>Your message has been saved successfully.</p>
      <a href="/">← Back to Home</a>
    `, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Sorry, something went wrong. Please try again.", { 
      status: 500 
    });
  }
}
