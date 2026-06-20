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

    return new Response("Success! Data saved.", { 
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Error: " + err.message, { status: 500 });
  }
}
