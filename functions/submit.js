
export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();

  await env.DB
    .prepare("INSERT INTO submissions (name) VALUES (?)")
    .bind(data.name)
    .run();
  
  return new Response("Saved successfully");
}
