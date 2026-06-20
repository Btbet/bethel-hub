// functions/submit.js

export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") || "Anonymous";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    // Save data to your database
    await env.DB.prepare(`
      INSERT INTO submissions (name, email, message, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(name, email, message).run();

    // Redirect to a thank you message
    return Response.redirect("/thankyou.html", 302);

  } catch (err) {
    console.error(err);
    return new Response("Error saving your message. Please try again.", { 
      status: 500 
    });
  }
}
