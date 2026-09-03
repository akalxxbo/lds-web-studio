export default async (request, context) => {
  const acceptHeader = request.headers.get("accept") || "";

  // Comprobar si el cliente o agente IA solicita formato markdown
  if (acceptHeader.toLowerCase().includes("text/markdown")) {
    const url = new URL(request.url);
    let targetPath = url.pathname;

    if (targetPath === "/" || targetPath === "/index.html" || targetPath === "") {
      targetPath = "/index.md";
    } else if (targetPath === "/terminos.html" || targetPath === "/terminos") {
      targetPath = "/terminos.md";
    } else if (targetPath === "/privacidad.html" || targetPath === "/privacidad") {
      targetPath = "/privacidad.md";
    }

    try {
      const mdUrl = new URL(targetPath, url.origin);
      const mdResponse = await fetch(mdUrl);

      if (mdResponse.ok) {
        const markdown = await mdResponse.text();
        const tokens = Math.ceil(markdown.length / 4);

        return new Response(markdown, {
          status: 200,
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "vary": "Accept",
            "x-markdown-tokens": String(tokens),
            "access-control-allow-origin": "*"
          }
        });
      }
    } catch (err) {
      // En caso de error, continuar con el flujo normal
    }
  }

  const response = await context.next();
  response.headers.set("Vary", "Accept");
  return response;
};
