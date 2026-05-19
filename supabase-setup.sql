-- ════════════════════════════════════════════════════════════════════════
-- SETUP DE LA BASE DE DATOS PARA BABY ROMERO CURREA 🦕
-- ════════════════════════════════════════════════════════════════════════
-- INSTRUCCIONES:
-- 1. Entra a tu proyecto en Supabase: https://supabase.com
-- 2. En el menú lateral, ve a "SQL Editor"
-- 3. Haz clic en "New query"
-- 4. Copia TODO este archivo y pégalo
-- 5. Haz clic en "Run" (botón verde abajo a la derecha)
-- ════════════════════════════════════════════════════════════════════════

-- 1) Crear la tabla wishlist
CREATE TABLE IF NOT EXISTS wishlist (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- 2) Activar RLS (Row Level Security)
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- 3) Permitir a TODOS leer la lista (es pública, está bien)
DROP POLICY IF EXISTS "Cualquiera puede leer la lista" ON wishlist;
CREATE POLICY "Cualquiera puede leer la lista"
  ON wishlist FOR SELECT
  USING (true);

-- 4) Permitir a TODOS escribir (apartar regalos)
DROP POLICY IF EXISTS "Cualquiera puede apartar regalos" ON wishlist;
CREATE POLICY "Cualquiera puede apartar regalos"
  ON wishlist FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Cualquiera puede actualizar" ON wishlist;
CREATE POLICY "Cualquiera puede actualizar"
  ON wishlist FOR UPDATE
  USING (true) WITH CHECK (true);

-- 5) Activar Realtime para esta tabla
ALTER PUBLICATION supabase_realtime ADD TABLE wishlist;

-- ¡Listo! La base de datos está configurada. 🦕💚
