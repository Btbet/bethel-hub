export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(`
        <html>
          <body>
            <h1>Bethel Hub</h1>
            <form id="form">
              <input name="name" placeholder="Name">
              <button>Submit</button>
            </form>

            <script>
              document.getElementById('form').onsubmit = async (e) => {
                e.preventDefault();

                const name = e.target.name.value;

                const res = await fetch('/submit', {
                  method: 'POST',
                  headers: {'Content-Type':'application/json'},
                  body: JSON.stringify({name})
                });

                alert(await res.text());
              };
            </script>
          </body>
        </html>
      `, {
        headers: { "Content-Type": "text/html" }
      });
    }

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
