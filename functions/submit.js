export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const result = await env.DB
      .prepare(
        "INSERT INTO submissions (name, email, phone) VALUES (?, ?, ?)"
      )
      .bind(
        data.name,
        data.email,
        data.phone
      )
      .run();

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
        stack: String(err)
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
