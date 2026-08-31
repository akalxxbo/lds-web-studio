-- ==============================================================================
-- LDS AI & WEB LABS - CONFIGURACIÓN DE SUPABASE
-- Tabla para captura de leads y auditorías con seguridad RLS (Row Level Security)
-- ==============================================================================

-- 1. Crear extensión para UUIDs si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear tabla de 'leads'
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    service_interest TEXT NOT NULL, -- 'web_development', 'n8n_automation', 'ai_agents', 'full_ecosystem'
    monthly_budget TEXT,            -- '<$1k', '$1k-$3k', '$3k-$10k', '>$10k'
    project_description TEXT,
    status TEXT DEFAULT 'new' NOT NULL, -- 'new', 'contacted', 'audit_scheduled', 'closed'
    source TEXT DEFAULT 'landing_page_form',
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 3. Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- 4. Habilitar Seguridad a Nivel de Fila (Row Level Security - RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. Política para permitir INSERCIÓN pública (desde la landing page mediante la anon key de Supabase)
CREATE POLICY "Permitir insercion publica de leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 6. Política para permitir LECTURA y ACTUALIZACIÓN únicamente a administradores / n8n
CREATE POLICY "Solo administradores pueden leer leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Solo administradores pueden actualizar leads" 
ON public.leads 
FOR UPDATE 
TO authenticated 
USING (true);

COMMENT ON TABLE public.leads IS 'Almacena prospectos y solicitudes de auditoría recibidas desde la landing page LDS';
