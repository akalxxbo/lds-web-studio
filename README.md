# LDS Automate & Web Dev - Landing Page & Web Studio

Landing page oficial de **LDS Automate & Web Dev**. Diseño web moderno, de alto impacto y orientado a conversión, con integración de automatizaciones e Inteligencia Artificial.

## 🚀 Características

- **Diseño Ultra-Moderno & Responsive**: Construido con HTML5 semántico, Tailwind CSS y Vanilla CSS con estética glassmorphism, microinteracciones y animaciones sutiles.
- **Formulario de Captación Inteligente**: Modal interactivo de contacto y auditoría web gratuita.
- **Serverless Function (Netlify Functions)**: Función `/api/call-lead` (`netlify/functions/call-lead.js`) para procesar leads y conectar con webhooks de n8n / Make / llamadas automáticas Bland AI / Vapi / Retell AI de forma segura sin exponer credenciales en el cliente.
- **Páginas Legales Completas**:
  - `terminos.html` - Términos y Condiciones de Servicio conformes a la LSSI-CE.
  - `privacidad.html` - Política de Privacidad y Protección de Datos conforme al RGPD / LOPDGDD.
- **Optimizado para SEO y Rendimiento**: Meta tags Open Graph, Twitter Cards, favicons y directivas de seguridad en `netlify.toml`.
- **Preparado para Agentes IA (Agent-Ready)**:
  - Soporte de **Markdown Negotiation** (`Accept: text/markdown`) mediante Netlify Edge Functions para agentes como Claude, ChatGPT y Cursor.
  - Publicación de `llms.txt` e `index.md`.
  - Servidor oficial **Model Context Protocol (MCP)** con tarjeta SEP-1649 en `/.well-known/mcp/server-card.json` y función `/mcp`.
  - Catálogo de APIs (RFC 9727), reglas de rastreo (RFC 9309) y mapa del sitio XML.

## 🛠️ Estructura del Proyecto

```text
├── index.html                  # Landing page principal (HTML visual)
├── index.md                    # Versión Markdown para agentes IA (Accept: text/markdown)
├── terminos.html               # Términos y Condiciones (HTML)
├── terminos.md                 # Términos y Condiciones (Markdown)
├── privacidad.html             # Política de Privacidad (HTML)
├── privacidad.md               # Política de Privacidad (Markdown)
├── llms.txt                    # Estándar de contexto para LLMs (llmstxt.org)
├── .well-known/
│   ├── api-catalog             # Catálogo de APIs para agentes IA (RFC 9727 / RFC 9264 linkset)
│   └── mcp/
│       └── server-card.json    # MCP Server Card (SEP-1649) para descubrimiento de servidor MCP
├── robots.txt                  # Directivas de rastreo para bots y agentes IA (RFC 9309)
├── sitemap.xml                 # Mapa del sitio XML canónico (Sitemaps Protocol)
├── generate-sitemap.js         # Script automático de generación de sitemap en Netlify Build
├── generate-sitemap.ps1        # Script PowerShell de generación de sitemap para local
├── styles.css                  # Estilos personalizados y utilidades de animación
├── netlify.toml                # Configuración de despliegue, build, edge functions y cabeceras
├── logo.png                    # Logotipo LDS
├── logo_hero.png               # Logotipo adaptado para Hero
├── .env.example                # Variables de entorno de ejemplo
└── netlify/
    ├── edge-functions/
    │   └── markdown-negotiation.js # Negociación de contenido text/markdown en el Edge
    └── functions/
        ├── call-lead.js        # Netlify Serverless Function para webhook de leads
        └── mcp.js              # Netlify Serverless Function para protocolo MCP JSON-RPC
```

## ⚙️ Despliegue en Netlify

El proyecto está configurado para desplegarse automáticamente en **Netlify** conectado a la rama `main` de este repositorio.

### Variables de Entorno en Netlify (Opcional):
- `WEBHOOK_URL`: URL del webhook (n8n, Make o CRM) para recibir las solicitudes de auditoría / contacto.
- `AI_VOICE_API_KEY`: Clave de API de voz IA (si se conecta directamente a un servicio de llamadas).
