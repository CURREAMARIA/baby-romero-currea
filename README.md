# 🦕 Lista de Deseos · Baby Romero Currea

Una lista de regalos para baby shower con sincronización en tiempo real entre todos los invitados.

## 🎯 Lo que vamos a hacer

Publicar esta app en internet para que tengas un link tipo `baby-romero-currea.vercel.app` que puedas compartir por WhatsApp. Cuando un invitado aparte un regalo, todos los demás lo verán al instante.

**Tiempo total:** ~20 minutos · **Costo:** $0 (todo gratis)

---

## 📋 PASO 1: Crear cuenta en Supabase (la "nube" de tus datos)

### 1.1 Registro
1. Ve a **https://supabase.com** 
2. Haz clic en **"Start your project"** (arriba a la derecha)
3. Regístrate con **GitHub** o **Google** (lo más fácil)

### 1.2 Crear el proyecto
1. Clic en **"New Project"**
2. Si te pide crear una organización, ponle cualquier nombre (tu nombre, "Familia Romero", etc.)
3. **Datos del proyecto:**
   - **Project name:** `baby-romero-currea`
   - **Database Password:** Crea una contraseña fuerte (guárdala — no la vas a necesitar para esto pero por si acaso)
   - **Region:** Elige `South America (São Paulo)` (es la más cercana a Colombia)
   - **Pricing Plan:** `Free` ✓
4. Clic en **"Create new project"**
5. Espera ~2 minutos mientras crea el proyecto ☕

### 1.3 Configurar la base de datos
1. En el menú izquierdo, busca el ícono **"SQL Editor"** (parece `</>`)
2. Haz clic en **"+ New query"** (arriba a la derecha)
3. Abre el archivo **`supabase-setup.sql`** de este proyecto
4. **Copia TODO el contenido** y pégalo en el editor de Supabase
5. Haz clic en el botón verde **"Run"** abajo a la derecha
6. Deberías ver un mensaje de éxito ✅

### 1.4 Obtener las claves
1. En el menú izquierdo, ve a **"Project Settings"** (el ícono de engranaje ⚙️ abajo)
2. Clic en **"API"** en el submenú
3. Vas a copiar **2 datos** y guardarlos en un bloc de notas:
   - **Project URL** — algo como `https://abcdefgh.supabase.co`
   - **anon public** (en la sección "Project API keys") — un texto larguísimo

⚠️ **NO uses la clave que dice "service_role"** — usa SOLO la `anon public`.

---

## 📋 PASO 2: Subir la app a Vercel

### 2.1 Crear cuenta en Vercel
1. Ve a **https://vercel.com**
2. Haz clic en **"Sign Up"** 
3. Regístrate con **GitHub** o **Google** (el mismo que usaste para Supabase está bien)

### 2.2 Subir la carpeta del proyecto
1. En Vercel, haz clic en **"Add New..."** → **"Project"**
2. Verás una opción **"Import Git Repository"** y otra **"Deploy a template"** — pero también puedes subir la carpeta directamente:
   - Busca el enlace pequeño que dice **"Deploy without a Git repository"** o **"Import Third-Party Git Repository"**
   - **MEJOR OPCIÓN:** Usa el botón **"Browse all templates"** y luego en la parte superior verás **"Or upload a folder"** (subir carpeta)

**Alternativa más fácil — usando GitHub (recomendado):**
1. Ve a **https://github.com** y regístrate si no tienes cuenta
2. Crea un repositorio nuevo: clic en **"+"** arriba derecha → **"New repository"**
   - **Repository name:** `baby-romero-currea`
   - **Public** ✓
   - Clic en **"Create repository"**
3. En la pantalla siguiente, verás un botón **"uploading an existing file"** → clic ahí
4. **Arrastra TODA la carpeta del proyecto** (excepto `node_modules` si lo tienes)
5. Clic en **"Commit changes"** abajo
6. Vuelve a Vercel → **"Add New..."** → **"Project"**
7. Verás tu repositorio listado → clic en **"Import"**

### 2.3 Configurar variables de entorno
**¡ESTE PASO ES CLAVE!** 🔑

Antes de hacer clic en "Deploy", verás una sección llamada **"Environment Variables"**. Tienes que agregar las 2 claves de Supabase:

1. En "Name" pon: `VITE_SUPABASE_URL`
2. En "Value" pega tu URL de Supabase (la que copiaste en el paso 1.4)
3. Clic en **"Add"**

4. Agrega otra:
   - "Name": `VITE_SUPABASE_ANON_KEY`
   - "Value": tu clave anon public

### 2.4 Deploy
1. Haz clic en el botón grande **"Deploy"**
2. Espera ~2 minutos mientras Vercel construye y sube la app ☕
3. Cuando termine, verás 🎉 y un botón **"Continue to Dashboard"**

### 2.5 Tu link está listo
1. En el dashboard de Vercel, verás tu proyecto
2. Verás un dominio como `baby-romero-currea-xyz123.vercel.app`
3. **¡Ese es tu link!** Pruébalo en el celular, compártelo por WhatsApp

---

## 🎨 PASO 3 (opcional): Personalizar el dominio

Si quieres un link más bonito como `baby-romero.vercel.app`:

1. En Vercel, ve a tu proyecto → **"Settings"** → **"Domains"**
2. Haz clic en el dominio actual
3. Cambia el subdominio a algo más corto (debe estar disponible)

---

## ✅ Cómo verificar que funciona

1. Abre el link en **tu celular**
2. Aparta cualquier regalo (ej: la tina de baño)
3. Abre el mismo link en **tu computador** o pide a alguien que lo abra
4. Deberías ver que el regalo ya aparece como "Lo trae [tu nombre]"

¡Listo! 🦕💚

---

## 🆘 Si algo sale mal

### "El link no carga / pantalla en blanco"
- Verifica que las variables de entorno en Vercel estén bien escritas
- Verifica que copiaste la URL completa (con `https://`)
- En Vercel → tu proyecto → **"Deployments"** → último deploy → revisa los logs

### "Aparta regalos pero no se actualiza para otros"
- Verifica que ejecutaste el SQL completo en Supabase
- En Supabase → **Table Editor** → debes ver una tabla llamada `wishlist`
- En Supabase → **Database** → **Replication** → la tabla `wishlist` debe estar activa

### "Quiero hacer cambios después"
- Edita el archivo `src/App.jsx` localmente
- Sube los cambios a GitHub
- Vercel automáticamente re-publicará la app

---

## 📞 Datos importantes que debes guardar

```
🔑 Supabase URL: __________________________
🔑 Supabase Anon Key: __________________________
🌐 Mi link Vercel: __________________________
🔒 PIN Modo Mamá: 1234
```

¡Disfruta tu baby shower! 🦕🎉
