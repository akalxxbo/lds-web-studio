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

## 🛠️ Estructura del Proyecto

```text
├── index.html                  # Landing page principal
├── terminos.html               # Términos y Condiciones
├── privacidad.html             # Política de Privacidad
├── robots.txt                  # Directivas de rastreo para bots y agentes IA (RFC 9309)
├── sitemap.xml                 # Mapa del sitio XML canónico (Sitemaps Protocol)
├── generate-sitemap.js         # Script automático de generación de sitemap en Netlify Build
├── generate-sitemap.ps1        # Script PowerShell de generación de sitemap para local
├── styles.css                  # Estilos personalizados y utilidades de animación
├── netlify.toml                # Configuración de despliegue, build y cabeceras de seguridad
├── logo.png                    # Logotipo LDS
├── logo_hero.png               # Logotipo adaptado para Hero
├── .env.example                # Variables de entorno de ejemplo
└── netlify/
    └── functions/
        └── call-lead.js        # Netlify Serverless Function para webhook de leads
```

## ⚙️ Despliegue en Netlify

El proyecto está configurado para desplegarse automáticamente en **Netlify** conectado a la rama `main` de este repositorio.

### Variables de Entorno en Netlify (Opcional):
- `WEBHOOK_URL`: URL del webhook (n8n, Make o CRM) para recibir las solicitudes de auditoría / contacto.
- `AI_VOICE_API_KEY`: Clave de API de voz IA (si se conecta directamente a un servicio de llamadas).
