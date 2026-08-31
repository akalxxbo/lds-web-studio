/**
 * LDS WEB STUDIO - LÓGICA INTERACTIVA & FORMULARIO
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPillarsAccordion();
  initDemoTabs();
  initFaqAccordion();
  initLeadForm();
  initAgentSimulator();
  initMonogramParallax();
  initFloatingQuoteWidget();
});

/* ==============================================================================
   1. MENÚ MÓVIL
   ============================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==============================================================================
   2. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
   ============================================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');
      const isExpanded = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => {
        if (i) i.style.transform = 'rotate(0deg)';
      });

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==============================================================================
   3. SIMULADOR DE ASISTENTE WEB LDS
   ============================================================================== */
function initAgentSimulator() {
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (!chatWindow || !chatForm || !chatInput) return;

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    handleUserMessage(message);
    chatInput.value = '';
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleUserMessage(prompt);
      }
    });
  });

  function handleUserMessage(text) {
    appendUserMessage(text);

    const typingIndicator = appendTypingIndicator();
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const responseData = generateAgentResponse(text);
      appendAgentMessage(responseData);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 650);
  }

  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex items-start justify-end gap-2.5 max-w-[90%] sm:max-w-[85%] ml-auto';
    msgDiv.innerHTML = `
      <div class="chat-bubble-user-light p-3 sm:p-3.5 rounded-2xl rounded-tr-sm text-xs sm:text-sm font-medium shadow-sm">
        <p>${escapeHtml(text)}</p>
      </div>
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex-shrink-0 flex items-center justify-center font-bold text-[10px] sm:text-xs">
        Tú
      </div>
    `;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'flex items-start gap-2.5 max-w-[90%]';
    typingDiv.innerHTML = `
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-on-secondary-fixed text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px] sm:text-xs">
        LDS
      </div>
      <div class="chat-bubble-agent-light p-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    `;
    chatWindow.appendChild(typingDiv);
    return typingDiv;
  }

  function appendAgentMessage({ toolBadge, text, actionHtml }) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%]';
    msgDiv.innerHTML = `
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-on-secondary-fixed text-white flex-shrink-0 flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-sm">
        LDS
      </div>
      <div class="chat-bubble-agent-light p-3.5 sm:p-4 rounded-2xl rounded-tl-sm text-on-secondary-fixed flex flex-col gap-2 shadow-sm">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[11px] sm:text-xs text-on-secondary-fixed">LDS Web Studio</span>
          ${toolBadge ? `<span class="tool-badge-light">${toolBadge}</span>` : ''}
        </div>
        <div class="text-xs sm:text-sm leading-relaxed">${text}</div>
        ${actionHtml ? `<div class="pt-1">${actionHtml}</div>` : ''}
      </div>
    `;
    chatWindow.appendChild(msgDiv);
  }

  function generateAgentResponse(query) {
    const q = query.toLowerCase();

    // Precios y Presupuesto
    if (q.includes('precio') || q.includes('cuesta') || q.includes('coste') || q.includes('cuanto') || q.includes('presupuesto') || q.includes('tarifa')) {
      return {
        toolBadge: '<span class="material-symbols-outlined text-[10px]">calculate</span> Presupuesto Sin Compromiso',
        text: `Cada proyecto es único y adaptado a las necesidades de tu negocio.
          <p class="mt-1.5 text-xs text-on-secondary">
            Te preparamos una <strong>propuesta personalizada y cerrada en menos de 24 horas</strong>, 100% sin compromiso ni costes sorpresa.
          </p>`,
        actionHtml: `<a href="#auditoria" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-white text-xs font-bold hover:bg-secondary/90 shadow-sm transition-all">Solicitar Presupuesto Gratuito →</a>`
      };
    }

    // Diferencia Landing vs Web
    if (q.includes('landing') || q.includes('diferencia') || q.includes('corporativa')) {
      return {
        toolBadge: '<span class="material-symbols-outlined text-[10px]">devices</span> Asesoría Web',
        text: `• <strong>Landing Page:</strong> Es una sola página directa al grano, ideal si haces anuncios en Google/Meta o vendes un servicio específico. Su único objetivo es que el usuario te contacte.<br><br>• <strong>Web Corporativa:</strong> Es un sitio completo con varias secciones (Inicio, Quiénes Somos, Servicios, Blog, Contacto), ideal para empresas consolidadas que necesitan posicionar en Google.`
      };
    }

    // Tiempos
    if (q.includes('tiempo') || q.includes('tarda') || q.includes('plazo') || q.includes('dias') || q.includes('semanas')) {
      return {
        toolBadge: '<span class="material-symbols-outlined text-[10px]">timer</span> Plazos de Entrega',
        text: `Trabajamos rápido para que no pierdas ventas:<br>
        • <strong>Landing Page:</strong> 7 días laborables.<br>
        • <strong>Web Corporativa:</strong> 10 a 14 días laborables.<br>
        Te mostramos avances en vivo durante todo el desarrollo.`
      };
    }

    // Respuesta general
    return {
      toolBadge: '<span class="material-symbols-outlined text-[10px]">web</span> LDS Web Team',
      text: `En <strong>LDS</strong> nos especializamos en crear páginas web modernas, rápidas y optimizadas para móvil que generan resultados reales.<br><br>¿Te gustaría que te preparemos un presupuesto a medida sin compromiso?`,
      actionHtml: `<a href="#auditoria" class="inline-flex items-center gap-1 text-xs text-secondary font-bold hover:underline">Solicitar Presupuesto Web →</a>`
    };
  }
}

/* ==============================================================================
   4. FORMULARIO DINÁMICO DE PRESUPUESTO & NOTIFICACIONES TOAST
   ============================================================================== */
const SERVICE_CONFIGS = {
  web_corporativa: {
    canonical: 'web_corporativa',
    title: 'Pide Presupuesto para tu Nueva Página Web',
    placeholder: '¿A qué se dedica tu empresa? ¿Tienes alguna web de referencia que te guste?',
    badge: 'Presupuesto Rápido y Sin Compromiso',
    subtitle: 'Cuéntanos qué necesitas y te responderemos en menos de 24 horas con una propuesta clara y cerrada.'
  },
  agente_whatsapp: {
    canonical: 'agente_whatsapp',
    title: 'Cuéntanos sobre tu Agente de WhatsApp',
    placeholder: '¿Cuántos mensajes/consultas recibes al mes aproximadamente? ¿Qué te gustaría automatizar?',
    badge: 'Automatización WhatsApp 24/7',
    subtitle: 'Diseñamos un agente inteligente que atienda y cualifique a tus clientes al instante.'
  },
  agente_voz: {
    canonical: 'agente_voz',
    title: 'Cuéntanos sobre tu Agente por Voz',
    placeholder: '¿Cuántas llamadas recibes al mes aproximadamente? ¿Qué te gustaría que gestionara el agente de voz?',
    badge: 'Agente de Llamadas por Voz',
    subtitle: 'Automatiza la recepción y gestión de llamadas para tu negocio con IA conversacional.'
  },
  web_con_ia: {
    canonical: 'web_con_ia',
    title: 'Presupuesto: Web + Agente IA',
    placeholder: '¿A qué se dedica tu negocio y qué te gustaría que haga la web y el asistente inteligente?',
    badge: 'Solución Integral Llave en Mano',
    subtitle: 'Web de alta conversión + automatización inteligente conectada a tu negocio.'
  }
};

const SERVICE_ALIASES = {
  'web': 'web_corporativa',
  'web_corporativa': 'web_corporativa',
  'webs': 'web_corporativa',
  'landing': 'web_corporativa',
  'whatsapp': 'agente_whatsapp',
  'agente_whatsapp': 'agente_whatsapp',
  'ws': 'agente_whatsapp',
  'chat': 'agente_whatsapp',
  'voz': 'agente_voz',
  'agente_voz': 'agente_voz',
  'llamadas': 'agente_voz',
  'voice': 'agente_voz',
  'call': 'agente_voz',
  'web_con_ia': 'web_con_ia',
  'pack': 'web_con_ia',
  'ia': 'web_con_ia'
};

function normalizeServiceKey(raw) {
  if (!raw) return 'web_corporativa';
  const clean = raw.trim().toLowerCase();
  return SERVICE_ALIASES[clean] || 'web_corporativa';
}

function applyServiceToForm(serviceKey, shouldFocus = false) {
  const normalizedKey = normalizeServiceKey(serviceKey);
  const config = SERVICE_CONFIGS[normalizedKey] || SERVICE_CONFIGS.web_corporativa;

  const titleEl = document.getElementById('form-title');
  const subtitleEl = document.getElementById('form-subtitle');
  const badgeEl = document.getElementById('form-badge-text');
  const serviceSelect = document.getElementById('serviceInterest');
  const descTextarea = document.getElementById('projectDescription');
  const nameInput = document.getElementById('fullName');

  if (serviceSelect && serviceSelect.value !== config.canonical) {
    serviceSelect.value = config.canonical;
  }

  if (titleEl) {
    titleEl.textContent = config.title;
  }

  if (subtitleEl) {
    subtitleEl.textContent = config.subtitle;
  }

  if (badgeEl) {
    badgeEl.textContent = config.badge;
  }

  if (descTextarea) {
    descTextarea.placeholder = config.placeholder;
  }

  if (shouldFocus) {
    setTimeout(() => {
      if (nameInput) {
        nameInput.focus();
      }
    }, 450);
  }
}

// ==============================================================================
// CONFIGURACIÓN DE SUPABASE & RETELL AI (LDS WEB STUDIO)
// ==============================================================================
const LDS_SUPABASE_CONFIG = {
  url: 'https://zxznfubjwsqtcqkfezge.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4em5mdWJqd3NxdGNxa2ZlemdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNzI1ODksImV4cCI6MjEwMzc0ODU4OX0.l52TAckE6IAPqhAp7UvK-fv_leC0s8qO6t8xVgU_hjo'
};

const LDS_RETELL_CONFIG = {
  agentId: 'agent_cc15431e9b593a91ae4882083e',
  fromNumber: '+34960731374',
  apiKey: '', // Pega aquí tu API Key de Retell (key_...) para llamadas directas
  supabaseEdgeFunctionUrl: 'https://zxznfubjwsqtcqkfezge.supabase.co/functions/v1/call-lead'
};

/**
 * Normaliza el número de teléfono añadiendo prefijo +34 si es un móvil español estándar de 9 dígitos
 */
function normalizePhoneNumber(rawPhone) {
  if (!rawPhone) return '';
  const cleaned = rawPhone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+')) return cleaned;
  if (cleaned.startsWith('00')) return '+' + cleaned.slice(2);
  if (/^[6789]\d{8}$/.test(cleaned)) return '+34' + cleaned;
  return cleaned;
}

/**
 * Guarda el lead en tiempo real en la tabla 'leads' de Supabase
 */
async function saveLeadToSupabase(payload) {
  try {
    const formattedPhone = normalizePhoneNumber(payload.phone);
    const body = JSON.stringify({
      full_name: payload.fullName,
      email: payload.email,
      phone: formattedPhone,
      service_interest: payload.serviceInterest,
      project_description: payload.projectDescription,
      request_voice_call: payload.requestVoiceCall,
      status: 'new',
      source: 'lds_landing_page'
    });

    const res = await fetch(`${LDS_SUPABASE_CONFIG.url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': LDS_SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${LDS_SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: body
    });

    if (res.ok) {
      console.log('✅ [SUPABASE] Lead guardado exitosamente en tu base de datos');
    } else {
      const err = await res.text();
      console.warn('⚠️ [SUPABASE] Nota:', err);
    }
  } catch (error) {
    console.warn('⚠️ [SUPABASE] Error de conexión:', error);
  }
}

/**
 * Envía una notificación instantánea por correo electrónico a dimiyord@gmail.com
 */
async function sendLeadEmailNotification(payload) {
  try {
    const formattedPhone = normalizePhoneNumber(payload.phone);
    const emailBody = {
      "Nombre Cliente": payload.fullName,
      "Email Contacto": payload.email,
      "Teléfono / WhatsApp": formattedPhone,
      "Servicio Solicitado": payload.serviceInterest,
      "Detalles del Proyecto": payload.projectDescription,
      "¿Pidió Llamada IA?": payload.requestVoiceCall ? "SÍ (Llamada en Vivo)" : "No",
      "Fecha de Solicitud": new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
      "_subject": `🚨 [NUEVO LEAD LDS] ${payload.fullName} - ${payload.serviceInterest}`,
      "_template": "table",
      "_captcha": "false"
    };

    await fetch('https://formsubmit.co/ajax/dimiyord@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailBody)
    });
    console.log('📧 [EMAIL] Notificación enviada a dimiyord@gmail.com');
  } catch (error) {
    console.warn('⚠️ [EMAIL] Nota envío correo:', error);
  }
}

/**
 * Dispara la llamada saliente con Retell AI / Supabase INMEDIATAMENTE
 */
async function triggerRetellVoiceCall(payload) {
  const formattedPhone = normalizePhoneNumber(payload.phone);
  
  const callPayload = {
    fullName: payload.fullName,
    phone: formattedPhone,
    serviceInterest: payload.serviceInterest,
    from_number: LDS_RETELL_CONFIG.fromNumber,
    to_number: formattedPhone,
    agent_id: LDS_RETELL_CONFIG.agentId,
    retell_llm_dynamic_variables: {
      nombre: payload.fullName || 'Cliente',
      servicio: payload.serviceInterest || 'Web y Automatización'
    }
  };

  console.log('🚀 [DISPARANDO LLAMADA RETELL AI AL INSTANTE]', callPayload);

  // 1. Intentar endpoint del servidor local
  try {
    const localRes = await fetch('/api/call-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(callPayload)
    });
    if (localRes.ok) {
      const data = await localRes.json();
      console.log('📞 [LLAMADA INICIADA EXITOSAMENTE]', data);
      return data;
    }
  } catch (e) {
    // Si no está en localhost, continuar con Edge Function
  }

  // 2. Si se llama a través de la Edge Function de Supabase:
  try {
    if (LDS_RETELL_CONFIG.supabaseEdgeFunctionUrl && !LDS_RETELL_CONFIG.supabaseEdgeFunctionUrl.includes('TU_PROYECTO')) {
      const res = await fetch(LDS_RETELL_CONFIG.supabaseEdgeFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, phone: formattedPhone })
      });
      return await res.json();
    }
  } catch (error) {
    console.warn('⚠️ Nota de conexión con Edge Function de Retell:', error);
  }

  return { status: 'queued', to: formattedPhone };
}

function initLeadForm() {
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-lead-btn');
  const serviceSelect = document.getElementById('serviceInterest');

  // 1. Detectar parámetro inicial en la URL (?servicio=... o #auditoria?servicio=...)
  const urlParams = new URLSearchParams(window.location.search);
  const queryService = urlParams.get('servicio') || urlParams.get('service');
  
  if (queryService) {
    applyServiceToForm(queryService, false);
  } else if (window.location.hash.includes('servicio=')) {
    const hashParams = new URLSearchParams(window.location.hash.substring(window.location.hash.indexOf('?')));
    const hashService = hashParams.get('servicio');
    if (hashService) applyServiceToForm(hashService, false);
  } else {
    // Por defecto (web)
    applyServiceToForm('web_corporativa', false);
  }

  // 2. Escuchar cambios manuales en el desplegable <select>
  if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
      applyServiceToForm(e.target.value, false);
      try {
        const newUrl = new URL(window.location.href);
        const shortParam = e.target.value === 'web_corporativa' ? 'web' : (e.target.value === 'agente_whatsapp' ? 'whatsapp' : (e.target.value === 'agente_voz' ? 'voz' : e.target.value));
        newUrl.searchParams.set('servicio', shortParam);
        window.history.replaceState({}, '', newUrl.toString());
      } catch (err) {}
    });
  }

  // 3. Sincronizar botones CTA que contengan data-service
  const serviceCtas = document.querySelectorAll('[data-service]');
  serviceCtas.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedService = btn.getAttribute('data-service');
      if (selectedService) {
        applyServiceToForm(selectedService, true);
        try {
          const newUrl = new URL(window.location.href);
          const shortParam = selectedService === 'web_corporativa' ? 'web' : (selectedService === 'agente_whatsapp' ? 'whatsapp' : (selectedService === 'agente_voz' ? 'voz' : selectedService));
          newUrl.searchParams.set('servicio', shortParam);
          window.history.replaceState({}, '', newUrl.toString());
        } catch (err) {}
      }
    });
  });

  // 4. Procesar envío del formulario con Medidas de Seguridad y Rate Limiting
  if (!form || !submitBtn) return;

  function sanitizeInput(str) {
    if (!str) return '';
    return String(str).trim().replace(/<[^>]*>?/gm, '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // 🛡️ SEGURIDAD 1: Honeypot Anti-Bot (Si viene relleno, es un bot automático)
    const botTrap = formData.get('website_hp_check');
    if (botTrap) {
      console.warn('🛡️ [SEGURIDAD LDS] Bot detectado y bloqueado silenciosamente.');
      form.reset();
      return;
    }

    // 🛡️ SEGURIDAD 2: Rate Limiting / Cooldown de 45 segundos por navegador
    const RATE_LIMIT_SECONDS = 45;
    const lastSubmission = localStorage.getItem('lds_last_lead_ts');
    const now = Date.now();

    if (lastSubmission && (now - parseInt(lastSubmission, 10)) < (RATE_LIMIT_SECONDS * 1000)) {
      const remainingSec = Math.ceil((RATE_LIMIT_SECONDS * 1000 - (now - parseInt(lastSubmission, 10))) / 1000);
      showToast(`⏱️ Por favor, espera ${remainingSec}s antes de enviar otra solicitud.`);
      return;
    }

    const requestVoiceCall = formData.get('requestVoiceCall') === 'on';
    const payload = {
      fullName: sanitizeInput(formData.get('fullName')),
      email: sanitizeInput(formData.get('email')),
      phone: sanitizeInput(formData.get('phone')) || 'No especificado',
      serviceInterest: sanitizeInput(formData.get('serviceInterest')),
      projectDescription: sanitizeInput(formData.get('projectDescription')),
      requestVoiceCall: requestVoiceCall,
      submittedAt: new Date().toISOString(),
      source: 'LDS Web Studio Form'
    };

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="material-symbols-outlined text-base animate-spin">progress_activity</span>
      <span>${requestVoiceCall ? 'Conectando con Agente Retell IA...' : 'Guardando solicitud...'}</span>
    `;

    // 1. Guardar lead en Supabase
    await saveLeadToSupabase(payload);

    // 2. Enviar notificación por Email a dimiyord@gmail.com
    sendLeadEmailNotification(payload);

    // 3. Disparar llamada si está marcada la casilla
    if (requestVoiceCall && payload.phone && payload.phone !== 'No especificado') {
      await triggerRetellVoiceCall(payload);
    }

    // Registrar marca de tiempo para el cooldown anti-spam
    localStorage.setItem('lds_last_lead_ts', Date.now().toString());

    await new Promise(resolve => setTimeout(resolve, 800));

    console.log('--- [SOLICITUD PRESUPUESTO & DEMO VOZ LDS] ---');
    console.log('Payload:', payload);
    console.log('----------------------------------------------');

    const firstName = payload.fullName ? payload.fullName.split(' ')[0] : 'amigo/a';

    if (requestVoiceCall && payload.phone && payload.phone !== 'No especificado') {
      showToast(`📞 ¡Perfecto, ${firstName}! Nuestro Agente por Voz te está llamando a ${payload.phone}... ¡Atento a tu teléfono!`);
    } else {
      showToast(`✅ ¡Gracias, ${firstName}! Hemos recibido tu solicitud. Te contactaremos en menos de 24h.`);
    }

    const currentService = serviceSelect ? serviceSelect.value : 'web_corporativa';
    form.reset();
    if (serviceSelect) serviceSelect.value = currentService;
    applyServiceToForm(currentService, false);

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
  });
}

/* ==============================================================================
   5. TOAST NOTIFICATIONS
   ============================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-light';

  toast.innerHTML = `
    <span class="material-symbols-outlined text-emerald-600 text-xl flex-shrink-0">check_circle</span>
    <span class="text-xs sm:text-sm font-semibold text-on-secondary-fixed">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/* ==============================================================================
   6. MICRO-MOVIMIENTO INTERACTIVO Y PARALLAX DEL PATRÓN MONOGRAMA
   ============================================================================== */
function initMonogramParallax() {
  const bgLayer = document.getElementById('lds-monogram-bg');
  if (!bgLayer) return;

  // Respetar preferencias de reducción de movimiento del usuario
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let targetRotate = 0;
  let currentRotate = 0;
  let isTicking = false;

  if (!isTouchDevice) {
    // === ESCRITORIO: Efecto Parallax con el cursor del ratón ===
    // Desplaza sutilmente la capa completa en la dirección opuesta al cursor (máx ±12px)
    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Normalizado de -1 a +1
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;

      targetX = -normX * 12;
      targetY = -normY * 12;

      requestUpdate();
    }, { passive: true });

    // Regreso suave al centro cuando el ratón sale de la pantalla
    document.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      requestUpdate();
    });

  } else {
    // === MÓVILES / TÁCTILES: Efecto Parallax de Scroll con micro-inclinación ===
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Desplazamiento continuo a diferente velocidad que el contenido (parallax de scroll)
      targetY = -(scrollY * 0.06) % 160;

      // Leve oscilación dinámica según la velocidad de scroll (máx ±1.8°)
      const scrollVelocity = Math.max(-12, Math.min(12, delta));
      targetRotate = scrollVelocity * 0.1;

      requestUpdate();

      // Regreso a rotación cero tras detener el scroll
      clearTimeout(bgLayer._rotTimer);
      bgLayer._rotTimer = setTimeout(() => {
        targetRotate = 0;
        requestUpdate();
      }, 100);
    }, { passive: true });
  }

  function requestUpdate() {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateTransform);
    }
  }

  function updateTransform() {
    // Interpolación LERP (Linear Interpolation) suave para movimiento fluido a 60/120fps
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    currentRotate += (targetRotate - currentRotate) * 0.12;

    const diff = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) + Math.abs(targetRotate - currentRotate);

    if (Math.abs(currentRotate) > 0.01) {
      bgLayer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentRotate.toFixed(2)}deg)`;
    } else {
      bgLayer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    }

    if (diff > 0.01) {
      requestAnimationFrame(updateTransform);
    } else {
      isTicking = false;
    }
  }
}

/* ==============================================================================
   7. WIDGET FLOTANTE INFERIOR DERECHO (PRESUPUESTO SIN COMPROMISO)
   ============================================================================== */
function initFloatingQuoteWidget() {
  const widget = document.getElementById('floating-quote-widget');
  const card = document.getElementById('floating-quote-card');
  const mini = document.getElementById('floating-quote-mini');
  const closeBtn = document.getElementById('floating-quote-close');
  const ctaBtn = document.getElementById('floating-quote-cta-btn');

  if (!widget || !card || !mini) return;

  // Minimizar
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.add('hidden');
      mini.classList.remove('hidden');
      mini.classList.add('flex');
    });
  }

  // Restaurar
  mini.addEventListener('click', () => {
    mini.classList.add('hidden');
    mini.classList.remove('flex');
    card.classList.remove('hidden');
  });

  // Click en CTA para hacer scroll suave y enfocar el primer campo
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      setTimeout(() => {
        const inputName = document.getElementById('fullName');
        if (inputName) inputName.focus();
      }, 500);
    });
  }
}

/* ==============================================================================
   8. ACORDEÓN DESPLEGABLE DE LOS 3 PILARES EN MÓVIL
   ============================================================================== */
function initPillarsAccordion() {
  const toggles = document.querySelectorAll('.pillar-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      // En desktop (>= 768px) no colapsa
      if (window.innerWidth >= 768) return;

      const card = toggle.closest('.pillar-card');
      const content = card.querySelector('.pillar-content');
      const chevron = card.querySelector('.pillar-chevron');
      const isExpanded = !content.classList.contains('hidden');

      // Cerrar otros pilares en móvil
      document.querySelectorAll('.pillar-card').forEach(otherCard => {
        const otherContent = otherCard.querySelector('.pillar-content');
        const otherChevron = otherCard.querySelector('.pillar-chevron');
        const otherToggle = otherCard.querySelector('.pillar-toggle');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        otherCard.classList.remove('active-card');
      });

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        toggle.setAttribute('aria-expanded', 'true');
        card.classList.add('active-card');
      }
    });
  });
}

/* ==============================================================================
   9. PESTAÑAS DEMO INTERACTIVAS EN MÓVIL (WHATSAPP vs VOZ)
   ============================================================================== */
function initDemoTabs() {
  const tabWhatsapp = document.getElementById('demo-tab-whatsapp');
  const tabVoice = document.getElementById('demo-tab-voice');
  const panelWhatsapp = document.getElementById('demo-panel-whatsapp');
  const panelVoice = document.getElementById('demo-panel-voice');

  if (!tabWhatsapp || !tabVoice || !panelWhatsapp || !panelVoice) return;

  function switchTab(active) {
    if (active === 'whatsapp') {
      panelWhatsapp.classList.remove('hidden');
      panelVoice.classList.add('hidden');
      panelVoice.classList.remove('flex');

      tabWhatsapp.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white text-on-secondary-fixed shadow-sm';
      tabVoice.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-secondary-fixed';
    } else {
      panelWhatsapp.classList.add('hidden');
      panelVoice.classList.remove('hidden');
      panelVoice.classList.add('flex');

      tabVoice.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white text-on-secondary-fixed shadow-sm';
      tabWhatsapp.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-secondary-fixed';
    }
  }

  tabWhatsapp.addEventListener('click', () => switchTab('whatsapp'));
  tabVoice.addEventListener('click', () => switchTab('voice'));
}
