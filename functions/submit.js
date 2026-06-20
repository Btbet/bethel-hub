export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();

  await env.DB
    .prepare(
      "INSERT INTO submissions (name, email, phone) VALUES (?, ?, ?)"
    )
    .bind(
      data.name,
      data.email,
      data.phone
    )
    .run();

  return new Response(
    `${data.name}, your details have been submitted successfully!`
  );
}
