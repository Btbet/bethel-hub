export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/submit" && request.method === "POST") {
      const data = await request.json();

      await env.DB
        .prepare("INSERT INTO submissions (name) VALUES (?)")
        .bind(data.name)
        .run();

      return new Response("Saved successfully");
    }

    return new Response("Not Found", { status: 404 });
  }
};
