export async function onRequestGet({ env }) {
  const { results } = await env.DB
    .prepare("SELECT * FROM submissions ORDER BY id DESC")
    .all();

  return Response.json(results);
}
