export async function onRequestPost({ request }) {
  const formData = await request.formData();
  const name = formData.get("name") || "Anonymous";

  return new Response(`
    <h2>Thank you ${name}!</h2>
    <p>Form works! (Test version - no database yet)</p>
    <p><a href="/">← Go Back</a></p>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}
