export async function onRequestPost({ request }) {
  return Response.json({
    userAgent: request.headers.get("User-Agent"),
    cf: request.cf
  });
}
