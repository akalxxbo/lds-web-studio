exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, mcp-session-id",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "ok",
        server: "LDS Automate & Web Dev MCP Server",
        version: "1.0.0",
        endpoint: "/mcp",
        transport: "http"
      })
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })
    };
  }

  const { method, params, id } = body;

  switch (method) {
    case "initialize":
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: { listChanged: false },
              resources: { listChanged: false },
              prompts: { listChanged: false }
            },
            serverInfo: {
              name: "lds-automate-web-dev",
              version: "1.0.0"
            }
          }
        })
      };

    case "tools/list":
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            tools: [
              {
                name: "get_agency_services",
                description: "Obtener el listado detallado de servicios de desarrollo web moderno, automatizaciones n8n y agentes IA de LDS Automate & Web Dev.",
                inputSchema: {
                  type: "object",
                  properties: {},
                  additionalProperties: false
                }
              },
              {
                name: "request_free_audit",
                description: "Solicitar una auditoría técnica o presupuestaria gratuita de diseño web y automatización para una empresa o profesional.",
                inputSchema: {
                  type: "object",
                  properties: {
                    fullName: { type: "string", description: "Nombre completo del solicitante" },
                    email: { type: "string", description: "Correo electrónico de contacto" },
                    phone: { type: "string", description: "Teléfono de contacto con prefijo internacional" },
                    company: { type: "string", description: "Nombre de la empresa o proyecto" },
                    serviceInterest: {
                      type: "string",
                      enum: ["web_development", "n8n_automation", "ai_agents", "full_ecosystem"],
                      description: "Área de interés principal"
                    },
                    projectDescription: { type: "string", description: "Detalles o requerimientos del proyecto" }
                  },
                  required: ["fullName", "email"]
                }
              }
            ]
          }
        })
      };

    case "tools/call":
      if (params && params.name === "get_agency_services") {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    agency: "LDS Automate & Web Dev",
                    tagline: "Desarrollo Web Moderno, Automatizaciones e Inteligencia Artificial",
                    services: [
                      {
                        title: "Webs Corporativas y Landing Pages de Alta Conversión",
                        features: ["Carga ultra-rápida (<1.5s)", "Diseño a medida sin plantillas lentas", "SEO y mobile-first", "100% de propiedad del cliente"]
                      },
                      {
                        title: "Automatización de Procesos Empresariales con n8n",
                        features: ["Integración con CRMs, WhatsApp, ERPs", "Workflows sin dependencias costosas de Zapier", "Sincronización de bases de datos"]
                      },
                      {
                        title: "Agentes Interactivos y Telefonía IA (Retell / Bland AI)",
                        features: ["Llamadas telefónicas de voz autónomas", "Calificación automática de leads", "Atención al cliente 24/7"]
                      }
                    ],
                    contact: {
                      email: "dimiyord@gmail.com",
                      phone: "+34 603 78 66 16",
                      website: "https://ldsagency.netlify.app"
                    }
                  }, null, 2)
                }
              ]
            }
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: `Herramienta ${params ? params.name : 'desconocida'} ejecutada con éxito.` }]
          }
        })
      };

    case "prompts/list":
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ jsonrpc: "2.0", id, result: { prompts: [] } })
      };

    case "resources/list":
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ jsonrpc: "2.0", id, result: { resources: [] } })
      };

    default:
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method '${method}' not found` }
        })
      };
  }
};
