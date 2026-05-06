# Guía de uso — Pixel Maker

## Índice
1. [Acceder al panel de administración](#1-acceder-al-panel-de-administración)
2. [Blog — crear y editar artículos](#2-blog--crear-y-editar-artículos)
3. [Proyectos — gestionar el portfolio](#3-proyectos--gestionar-el-portfolio)
4. [Servicios — precios y contenido](#4-servicios--precios-y-contenido)
5. [Mensajes de contacto](#5-mensajes-de-contacto)
6. [Configuración global (WhatsApp, redes, email)](#6-configuración-global-whatsapp-redes-email)
7. [Cómo cambiar textos del sitio](#7-cómo-cambiar-textos-del-sitio)
8. [Cómo agregar imágenes](#8-cómo-agregar-imágenes)

---

## 1. Acceder al panel de administración

1. Ir a `/admin/login` en el navegador (ej: `https://tusitio.com/admin/login`)
2. Ingresar el email y contraseña del usuario administrador de Supabase
3. Quedar en `/admin` — el dashboard principal

> El panel solo es accesible con credenciales válidas. Si se pierde acceso, resetear la contraseña desde Supabase → Authentication → Users.

---

## 2. Blog — crear y editar artículos

### Crear un artículo nuevo
1. Ir a `/admin/blog`
2. Clic en **"Nuevo artículo"**
3. Completar los campos:
   - **Idioma**: `es` (español) o `en` (inglés)
   - **Categoría**: development / marketing / business / seo / general
   - **Título**: el título principal del artículo
   - **Extracto**: resumen corto (1-2 oraciones, aparece en las tarjetas)
   - **URL de imagen**: ruta a la imagen, ej: `/img/blog/mi-imagen.webp`
   - **Contenido**: texto completo del artículo
   - **Fecha**: fecha de publicación
   - **Tiempo de lectura**: en minutos (ej: 5)
   - **Toggle publicado**: activar para que aparezca en el sitio
4. Clic en **"Crear artículo"**

### Editar un artículo existente
1. Ir a `/admin/blog`
2. Clic en el ícono de editar (lápiz) del artículo
3. Modificar los campos y clic en **"Actualizar"**

### Publicar / despublicar
- Desde la lista del blog, clic en el toggle verde/gris a la derecha de cada artículo

### Eliminar
- Clic en el ícono de papelera → confirmar el cuadro de diálogo

---

## 3. Proyectos — gestionar el portfolio

### Crear un proyecto
1. Ir a `/admin/projects`
2. Clic en **"Nuevo proyecto"**
3. Completar los campos:
   - **Nombre**: nombre del proyecto
   - **Categoría**: web / software / marketing / ecommerce
   - **Descripción corta**: 1 oración (aparece en tarjetas y listados)
   - **Descripción completa**: texto detallado para la página interna del proyecto
   - **Tecnologías**: separadas por coma, ej: `Next.js, Supabase, Tailwind CSS`
   - **URL del sitio**: link al proyecto en vivo (opcional)
   - **Imagen**: ruta a la imagen, ej: `/img/nombre-proyecto.webp`
   - **Toggle destacado**: activar para que aparezca en el home
4. Clic en **"Crear proyecto"**

> Las imágenes deben estar en la carpeta `public/img/` del proyecto.

---

## 4. Servicios — precios y contenido

### Crear un servicio
1. Ir a `/admin/services`
2. Clic en **"Nuevo servicio"**
3. Completar los campos:
   - **Nombre**: nombre del servicio
   - **Descripción**: resumen corto
   - **Ícono**: nombre del ícono de Lucide (ej: `Code2`, `ShoppingCart`, `Megaphone`)
   - **Color**: `purple`, `pink` o `fuchsia`
   - **Precio**: número (ej: `299`), dejar vacío si es a consultar
   - **Etiqueta de precio**: texto a mostrar (ej: `desde $299/mes`, `Consultar`)
   - **Características** (una por línea):
     ```
     Diseño responsivo
     Código optimizado
     SEO incluido
     ```
   - **Orden**: número para ordenar (1 = primero)
   - **Toggle destacado**: aparece en el home
   - **Toggle activo**: si está desactivado, no aparece en el sitio
4. Clic en **"Crear servicio"**

---

## 5. Mensajes de contacto

1. Ir a `/admin/messages`
2. Los mensajes nuevos aparecen con un punto azul (no leídos)
3. Clic en **"Marcar como leído"** para quitarles el indicador
4. Clic en **papelera** para eliminar un mensaje

---

## 6. Configuración global (WhatsApp, redes, email)

1. Ir a `/admin/settings`
2. Completar los campos:
   - **WhatsApp principal**: número con código de país, ej: `+5491112345678` (Argentina +54)
   - **WhatsApp secundario**: segundo número, ej: `+5215512345678` (México +52)
   - **Facebook**: URL completa, ej: `https://facebook.com/pixelmaker`
   - **Instagram**: URL completa, ej: `https://instagram.com/pixelmaker`
   - **Email de contacto**: ej: `hola@pixelmaker.dev`
3. Clic en **"Guardar configuración"**

> Estos datos aparecen automáticamente en el footer y en la página de contacto.

---

## 7. Cómo cambiar textos del sitio

Todos los textos del sitio están en dos archivos:

```
src/messages/es.json   ← textos en español
src/messages/en.json   ← textos en inglés
```

### Estructura del archivo

```json
{
  "home": {
    "blog": {
      "heading": "Del blog",        ← título de la sección blog en el home
      "subtitle": "Artículos...",   ← subtítulo
      "cta": "Leer todos..."        ← texto del botón "ver más"
    },
    "projects": {
      "heading": "Nuestros trabajos",
      "subtitle": "...",
      "cta": "Ver todos los proyectos"
    },
    "services": {
      "heading": "Qué hacemos",
      "subtitle": "..."
    },
    "hero": {
      "titleLine1": "Construimos el",
      "titleAccent": "futuro digital",
      "titleLine2": "de tu empresa",
      "subtitle": "...",
      "ctaPrimary": "Obtener presupuesto gratis",
      "ctaSecondary": "Ver nuestros trabajos"
    }
  },
  "contact": {
    "heading": "Hablemos",
    "subtitle": "...",
    "info": {
      "email": "hola@pixelmaker.dev",   ← fallback si no hay settings en DB
      "location": "México & Argentina",
      "response": "Respondemos en menos de 24 horas"
    }
  },
  "footer": {
    "tagline": "Construyendo el futuro digital...",
    "copyright": "© {year} Pixel Maker. Todos los derechos reservados."
  }
}
```

### Pasos para cambiar un texto
1. Abrir `src/messages/es.json` en el editor de código (VS Code)
2. Buscar el texto que se quiere cambiar con `Ctrl + F`
3. Editar el valor entre comillas
4. Guardar el archivo (`Ctrl + S`)
5. Repetir en `src/messages/en.json` para la versión en inglés
6. Hacer commit y push para que el cambio se refleje en producción

---

## 8. Cómo agregar imágenes

### Dónde poner los archivos

| Tipo de imagen   | Carpeta                  | Ejemplo de ruta         |
|-----------------|--------------------------|-------------------------|
| Blog            | `public/img/blog/`       | `/img/blog/mi-post.webp`|
| Proyectos       | `public/img/`            | `/img/mi-proyecto.webp` |
| General / logo  | `public/img/`            | `/img/logo.png`         |

### Formato recomendado
- **WebP** para fotos (menor peso, mejor calidad)
- **SVG** para logos e íconos
- Tamaño sugerido: 1200×630px para blog, 800×600px para proyectos

### Pasos
1. Copiar la imagen a la carpeta correspondiente dentro de `public/`
2. En el admin, editar el artículo o proyecto
3. En el campo **"URL de imagen"**, escribir la ruta, ej: `/img/blog/mi-articulo.webp`
4. Guardar

> La barra `/` al inicio es obligatoria. La imagen debe estar dentro de `public/`.

---

## Resumen rápido de rutas

| Sección          | URL admin               | URL pública               |
|-----------------|-------------------------|---------------------------|
| Dashboard        | `/admin`                | —                         |
| Blog             | `/admin/blog`           | `/es/blog`                |
| Proyectos        | `/admin/projects`       | `/es/projects`            |
| Servicios        | `/admin/services`       | `/es/services`            |
| Mensajes         | `/admin/messages`       | —                         |
| Configuración    | `/admin/settings`       | (footer y contacto)       |
| Textos del sitio | `src/messages/es.json`  | todo el sitio             |
