export async function onRequestPost(context) {
  const { env } = context;

  return new Response(
    JSON.stringify({
      dbExists: !!env.DB
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
